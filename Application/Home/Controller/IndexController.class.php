<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        # 返回主页面
        $this->display('Index/index');
    }

    public function home(){
        layout(false);
        $this->display('Index/index');
    }

    public function plupload(){
        $this->display();
    }

    public function margintop(){
        $this->display();
    }

    public function cssanimatestep(){
        $this->display();
    }
    public function bootstrapcols(){
        $this->display();
    }
}