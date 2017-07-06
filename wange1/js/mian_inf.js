/*
	封装了get的方法
 */


function get(url, options, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest(); // IE7+, Firefox, Chrome, Opera, Safari 代码
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5 代码
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callback(JSON.parse(xhr.responseText));
            }
        } else {
            console.log('Request was unsuccessful:' + xhr.status);
        }
    }
    xhr.open('get', url + '?' + serialize(options), true);
    xhr.send(null);
}
 
function serialize(data) {
    if (!data) return '';
    var pairs = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === 'function') continue;
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}


/*
设置 标题的分类 
	产品设计：10
	编程语言：20
	Class_style 为类别
	delete_get():清空之前加载的div，防止爆屏
	ChangePage():改变页面内容

 */


var Class_style=10;
var Chose_cpsj =document.getElementById('changpingsheji');
var Chose_bcyy = document.getElementById('bianchengyuyan');

Chose_cpsj.onclick=function(){
	Class_style = 10;
	Chose_cpsj.className ='head-active';
	Chose_bcyy.className = '';
	delete_get();
	ChangePage(page_index);
}

Chose_bcyy.onclick=function(){
	Class_style = 20;
	Chose_cpsj.className ='';
	Chose_bcyy.className = 'head-active';
	
	delete_get();
	ChangePage(page_index);
}

// 清空 get
function delete_get(){

	var delet = document.getElementById('b-nr-main');
	document.getElementById('b-neirong').removeChild(delet);

	var newmain = document.createElement('div');
	 	newmain.className = 'b-nr-main';
	 	newmain.id = 'b-nr-main';

	 document.getElementById('b-neirong').appendChild(newmain);

}

function start_get(){



get('http://study.163.com/webDev/couresByCategory.htm', {
    pageNo: 1,psize:20,type:Class_style
}, function(data) {
   


    setdiv(data);


  });
  }

  start_get();//初始化



/*
	实现页面选择器相关内容
	page_index :当前页面的页码
	Set_page(num):设置页码相关的html并且传入num为初始页面
	ChangePage(num)：改变页面  num 为页码
	page_parent.onclick:监听页面选择器
 */

var page_index=1;//页数

function Set_page(num){

	get('http://study.163.com/webDev/couresByCategory.htm', {
    pageNo: num,psize:20,type:Class_style
}, function(data) {
	var Page_num = data.totalPage;
for (var i=0;i<Page_num;i++){
		var Num = i+1;
	var page =document.createElement('li');
		page.innerHTML = Num;
		
		if(i==0){
		page.className='page-active';
	    }
	    page.setAttribute('name','page-num');
		
	var par = document.getElementById('b-nr-page');
	par.insertBefore(page,document.getElementById('page-next'));
}

});


}
Set_page(page_index);//初始化



function ChangePage(num){

	get('http://study.163.com/webDev/couresByCategory.htm', {
    pageNo: num,psize:20,type:Class_style
}, function(data) {
	
	setdiv(data);

	var pNum = document.getElementsByName('page-num');
	for(var i=0;i<pNum.length;i++){
		pNum[i].className = '';
	}

	pNum[num-1].className ='page-active';


});



}


var page_parent = document.getElementById('b-nr-page');

page_parent.onclick =function(){

		
		var page_btn = document.getElementById('b-nr-page').getElementsByTagName('li');
		console.log(page_btn);
		for(var i=0;i<page_btn.length;i++){
			var button = page_btn[i]
			
			button.onclick=function(){

				if(this.className == 'page-last'){
					if(page_index==1){
					   return;
					}
					else{
						page_index--;
						delete_get();
						ChangePage(page_index);

						}

			
				}//向前翻页

				if(this.className == 'page-next'){
					if(page_index==(page_btn.length-2)){
						return;
					}
					else{
						page_index++;
						delete_get();
						ChangePage(page_index);

					}
				}//向后翻页	
				
				if(this.className == '')
				{
					page_index = this.innerHTML;
					delete_get();
					ChangePage(page_index);
				}


			}
		}


}


/*
setdiv(data)：传入 ajax获取到的对象，动态生成html，在get的回调函数里调用

2017.7.5
 */



function setdiv(data){

var page  =    data.totalPage;

    for(i=0;i<data.list.length;i++){
    Id=data.list[i].id;
    Name=data.list[i].name;
    Img_url =data.list[i].bigPhotoUrl;
    Provider = data.list[i].provider;
    Pepo =data.list[i].learnerCount;
    Price =data.list[i].price;
    Description =data.list[i].description;
    Style =data.list[i].categoryName;
   
    // 自动化生成所需的mode的框架
    // 该部分为主体mode
    var mode = document.createElement('div');
        mode.className = 'nr-main-mode';
        mode.id = Id;
    
        // 该部分为mode的图片
    var m_img =document.createElement('img');
        m_img.className= 'main-mode-img';
        m_img.src = Img_url;

        // 该部分为mode的名字
    var m_name = document.createElement('span');
    	m_name.className = 'main-mode-name';
    var name_node=document.createTextNode(Name);
		m_name.appendChild(name_node);

		// 该部分为mode的提供者
    var m_style =document.createElement('p');
    	m_style.className='main-mode-style';
    var style_node=document.createTextNode(Provider);
    	m_style.appendChild(style_node);
    
    	// 该部分为mode的学习人数
    var m_pepo =document.createElement('div');
    	m_pepo.className ='main-mode-pepo';
    	var pepo_div =document.createElement('div');
    	m_pepo.appendChild(pepo_div);
    	var pepo_p = document.createElement('p');
    	pepo_p.innerHTML = Pepo;
    	m_pepo.appendChild(pepo_p);
    	if(Pepo>999 && Pepo<=9999)
    	{
    		m_pepo.style.width= '47px';
    	}
    	if(Pepo>9999)
    	{
    		m_pepo.style.width= '54px';
    	}
    	if(Pepo>99999){
    		m_pepo.style.width = '61px';
    	}


    	// 该部分为mode的价格
    var m_price =document.createElement('p');
    	m_price.className ='main-mode-price';

    	if(Price!=0){
    	m_price.innerHTML = '￥'+Price;}
    	else
    		{m_price.innerHTML='免费'}


    	// 绑定mode到相应模块
    var main=document.getElementById('b-nr-main');
        main.appendChild(mode);

        // 为每个小模块增加节点
    var main_mode = document.getElementById(Id);
    main_mode.appendChild(m_img);
    main_mode.appendChild(m_name);
    main_mode.appendChild(m_style);
    main_mode.appendChild(m_pepo);
    main_mode.appendChild(m_price);

    //隐藏的浮动口的描述....
    //先创建各种节点


	//创建节点
	var act_mode =document.createElement('div');
	var act_img =document.createElement('img');
	var act_name =document.createElement('span');
	var act_pepo =document.createElement('div');
	var act_pepo_div =document.createElement('div');
	var act_pepo_p =document.createElement('p');
	var act_provider =document.createElement('p');
	var act_style =document.createElement('p');
	var act_descri =document.createElement('div');


	//添加类
	
	act_mode.className = 'nr-main-mode-active';
	act_img.className = 'main-mode-img-active';
	act_img.src = Img_url;
	act_name.className = 'main-mode-name-active';
	act_name.innerHTML = Name;
	act_pepo.className = 'main-mode-pepo-active';
	act_pepo_p.innerHTML =Pepo +'人在学';

	act_provider.className = 'main-mode-provider-active';
	act_provider.innerHTML = '发布者 :'+Provider;
	act_style.className = 'main-mode-style-active';
	act_style.innerHTML ='分类 :' +Style;
	act_descri.className = 'main-mode-descri-active';
	act_descri.innerHTML = Description;


	if(act_name.innerHTML.length>11){

		act_pepo.style.top = '64px';
		act_style.style.top ='94px';
		act_provider.style.top='114px';

	}
 // console.log();
	//添加节点
		
	main_mode.appendChild(act_mode);
	act_mode.appendChild(act_img);
	act_mode.appendChild(act_name);
	act_mode.appendChild(act_pepo);
		act_pepo.appendChild(act_pepo_div);
		act_pepo.appendChild(act_pepo_p);
	act_mode.appendChild(act_provider);
	act_mode.appendChild(act_style);
	act_mode.appendChild(act_descri);	

  }

}