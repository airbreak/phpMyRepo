/**
 * Created by Jimmy on 2015/10/27.
 */
//教学视频

define(['jquery','jqueryui','jquerypage','util'],function () {
    var MyLesson = function ($wrapper) {
        this.$wrapper = $wrapper;
        this.basicApiUrl=window.urlObject.apiUrl+'/v1/org';
        this.organization_id = Hisihi.getOrgId();
        this.pageSize=50;
        this.loadData(1);
        this.initSortEvents();
        //编辑
        this.$wrapper.on('click','.editVideo',$.proxy(this,'showEditLessonBox'));
        //删除
        this.$wrapper.on('click','.deleteLesson',$.proxy(this,'deleteLesson'));
        //添加教程
        this.$wrapper.on('click','#addLessons',$.proxy(this,'addLessons'));
        //教程详情
        this.$wrapper.on('click','#lessonsMainCon>li', function () {
            var id=$(this).data('id');
            window.location.href = window.urlObject.ctl + "/Index/lessondetailinfo/id/"+id;
        });
    };
    MyLesson.prototype= {

        //数据加载
        loadData: function (pageIndex) {
            var that=this,
                dataStr={page:pageIndex,per_page:this.pageSize};
            new Hisihi.getDataAsync(
                this.basicApiUrl+'/'+this.organization_id+'/courses',
                dataStr,
                function(data){
                    that.showLessonInfo.call(that, data.courses);
                    that.initPage.call(that,data.total_count);
                },
                {
                    loginFail:function(txt){
                        that.showOperationResultTips(txt);
                    },
                    type:'get'
                }
            );
        },

        //展示部分教程数据
        showLessonInfo:function(data){
            var str='',
                that=this,
                typeNameAndTile='',
                tempTitle='',
                date=null;
            if(data.length>0) {
                $.each(data, function (){
                    var course=this.course,
                        url=course.img_str,
                        category=this.category;
                        url =url || window.urlObject.defaultImg.cover;
                    typeNameAndTile = category.title + ' | ' + course.title;
                    tempTitle = typeNameAndTile;
                    if (typeNameAndTile.length > 42) {
                        tempTitle = typeNameAndTile.substr(0, 42) + '…';
                    }
                    date = Hisihi.getTimeFromTimestamp(course.update_time);
                    str += '<li class="normal" data-id="' + course.id + '">' +
                        '<div class="videoItemHeader">' +
                        '<img src="' + url + '">' +
                        '<i class="playBtn"></i>' +
                        '</div>' +
                        '<div class="videoItemBottom">' +
                        '<div class="videoItemDesc"><p class="typeNameAndTitle" title="' + typeNameAndTile + '">' + tempTitle + '</p></div>' +
                        '<div class="videoFooter">' +
                        '<div class="videoFooterLeft">' +
                        '<i class="videoIcon videoClock"></i>' +
                        '<span>' + date + '</span>' +
                        '</div>' +
                        '<div class="videoFooterRight">' +
                        '<span>' + course.view_count + '</span>' +
                        '<i class="videoIcon videoViewedTimes"></i>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="delete-item-btn deleteLesson" title="删除"></div>' +
                        '</li>';
                });
            }else {
                str='<p class="noDataForQuery">视频教程暂无，快点上传吧。</p>';
            }
            str += '<div style="clear:both;">';
            that.$wrapper.find('.noDataForQuery').remove();
            this.$wrapper.find('#lessonsMainCon').append(str);

            this.$wrapper.find('.videoItemHeader img').lazyload({
                effect:'fadeIn',
                placeholder:window.urlObject.image+'/loading.gif'
            });

            //控制图片的显示，按比例显示
            this.$wrapper.find('.videoItemHeader img').unbind('load').bind("load",function(){
                $(this).setImgBox();
            });
        },

        //显示编辑框
        showEditLessonBox:function(e){
            var $target=$(e.currentTarget),
                flag=$target.text()=='编辑',
                $li = this.$wrapper.find('.list-data-ul li');
            if(flag) {
                $target.text('关闭编辑');
                $li.removeClass('normal').addClass('edit');
            }else{
                $target.text('编辑');
                $li.removeClass('edit').addClass('normal');
            }
        },

        //添加教程
        addLessons:function(){
            window.location.href = window.urlObject.ctl + "/Index/addnewlesson/id/"+0;
        },

        /*删除教程*/
        deleteLesson:function(e){
            e.stopPropagation();
            if(window.confirm('确定删除该教程么？')) {
                var $parent = $(e.currentTarget).closest('li'),
                    url = this.basicApiUrl + '/deleteCourses',
                    that = this;
                Hisihi.getDataAsync({
                    url: url,
                    data: {id: $parent.data('id')},
                    org: false,
                    callback: function (data) {
                        if (data.success) {
                            $parent.remove();
                        } else {
                            alert(data.message);
                        }
                    }
                });
            }
        },

        /*
         *教程移动事件注册
         *
         */
        initSortEvents:function(){
            $target = this.$wrapper.find('#lessonsMainCon');

            //任务拖动
            $target.sortable({
                items: ">li",
                helper: 'clone',
                delay: 300,
                cursor: 'move',
                scroll: true,
                placeholder: "sortableplaceholder",
                connectWith: '.memberItemUl',
                start: function (event, ui) {

                },

                stop: function (event, ui) {

                }
            });
        },


        /*
         *分页
         * para:
         * totalCount -{int} 总的记录数目
         */
        initPage:function(totalCount){
            totalCount=totalCount | 0;
            var $pageCon=this.$wrapper.find('#videoPageCon'),
                pageNum= Math.ceil(totalCount/this.pageSize),
                that=this;
            totalCount!=0 && $pageCon.children().length==0 && $pageCon.createPage({
                pageCount:pageNum,
                current:1,
                backFn: function (e) {
                    that.loadData.call(that,e);
                }
            });
        },

        /*显示操作信息*/
        showOperationResultTips:function(txt,$target){
            if(!$target){
                $target=$('#headerOperationResult');
            }
            $target.find('label').text(txt).show().delay(3000).hide(0);
        },

    };

    $(function(){
        var $wrapper=$('.vedioWrapper');
        if($wrapper.length>0) {
            new MyLesson($wrapper);
        }
    });
});