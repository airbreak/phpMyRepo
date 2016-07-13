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
    public function loadmorebydrag(){
        $this->display();
    }
    public function localtocity(){
        $this->display();
    }
    public function meteor(){
        $this->display();
    }
    public function stackblur(){
        $this->display();
    }

    public function islider(){
        $this->display();
    }

    public function fonticon(){
        $this->display();
    }

    public function loadinganimate(){
        $this->display();
    }

    public function mytips(){
        $this->display();
    }
    public function h5menu(){
        $this->display();
    }
}