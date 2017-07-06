window.onload=function(){

/*
  window 加载完毕后执行
  		banner：轮播视口
  		list：轮播表
  		slide_btn:轮播按钮
  		index:当前内容：
  		animated：判断动画是否进行完毕，为了防止轮播中途多次点击按钮造成的卡顿。


  		trans_animate(offset):改变list的位置
  		showBtn():显示当前页面的按钮
  		paly():开始轮播，用于定时操作
  		stop():结束轮播，用于鼠标悬停时候暂停
 */






		var banner=document.getElementById("b-banner");
		var list=document.getElementById("b-banner-list");
		var slide_btn=document.getElementById("b-slide").getElementsByTagName("i");
		var index=1;
		var animated=false;

	

	function trans_animate(offset){
		animated=true;
		var newleft= parseInt(list.style.left)+offset;
		var time=500;
		var time_jge=10;
		var speed=offset/(time/time_jge);

		function run(){
			if((speed<0 && parseInt(list.style.left)>newleft)||(speed>0 && parseInt(list.style.left)<newleft))
			{
				list.style.left=parseInt(list.style.left)+speed+'px';
				setTimeout(run,time_jge);
			}
			else
			{ 
				animated=false;
				list.style.left=newleft+'px';

				if(newleft >  0){
					list.style.left='-3220px';
				}
				if(newleft < -3220 ){
					list.style.left='0px';
				}
			}
		}
		run();
	}


	function showBtn(){

		for(var i=0;i<slide_btn.length;i++){
			var button=slide_btn[i];

			if(button.className=='active'){
				button.className='';
				break;
			}
		}
		slide_btn[index-1].className='active';
	}


	for(var i=0;i<slide_btn.length;i++){
		var button=slide_btn[i];
		button.onclick=function(){
			if(this.className=='active'){
				return;
			}
			var finIndex=parseInt(this.getAttribute('index'));
			var offset=-1610*(finIndex-index);

			if(!animated){
			trans_animate(offset);
			}
			console.log(offset);
			index=finIndex;
			showBtn();
		}
	}

	var timer;

	function play(){
		timer=setInterval(function(){
			 if(index==3){
            index=1;
                    }
  
        else{
            index+=1;    
        }
        //每次点击时，判断animated为false时执行动画
       if(!animated){
        trans_animate(-1610);
        }
         
  
        showBtn();
		},5000); 
	}

	function stop(){
		clearInterval(timer);
	}

	banner.onmouseover = stop;
	banner.onmouseout=play;

	play();


}



