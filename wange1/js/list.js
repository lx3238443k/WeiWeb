
function get_list(url, callback) {
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
    xhr.open('get', url, true);
    xhr.send(null);
}
 




get_list('http://study.163.com/webDev/hotcouresByCategory.htm', function(data) {
   
  

    for(var i=0;i<data.length;i++){

        var img_url = data[i].smallPhotoUrl;
        var name = data[i].name;
        var pepo = data[i].learnerCount;
        var id= data[i].id;

        var li = document.createElement('li');
            li.className = 'nr-list-li';
            li.id = id;

        var li_img = document.createElement('img');
            li_img.src = img_url;
        var li_name =document.createElement('span');
            li_name.className = 'list-li-name';
            li_name.innerHTML = name;

        var li_pepo = document.createElement('div');
            li_pepo.className ='list-pepo';

        var li_pepo_num = document.createElement('p');
            li_pepo_num.innerHTML = pepo;
            li_pepo.appendChild(document.createElement('div'));
            li_pepo.appendChild(li_pepo_num);

            li.appendChild(li_img);
            li.appendChild(li_name);
            li.appendChild(li_pepo);

        var ul = document.getElementById('hidden-ul');
            ul.appendChild(li);


    }

        var hid = document.getElementById('hidden-ul').getElementsByTagName('li');
             for(var i=0;i<=10;i++){
                var ull =document.getElementById('nr-list-ul');
                   ull.appendChild(hid[0]);       
             }   

        console.log(hid);

  });


 




            





var timer;

function play(){
    timer=setInterval(function(){

              
            var list = document.getElementById('nr-list-ul');
                list.style.top = '-70px';
                list.style.transitionDuration = '2s';
             
        setTimeout(function(){

            var li = document.getElementById('nr-list-ul').getElementsByTagName('li');
            
            var hid = document.getElementById('hidden-ul').getElementsByTagName('li');
              var hid_ul = document.getElementById('hidden-ul');
                  hid_ul.appendChild(li[0]);  
                  list.appendChild(hid[0]);
                  list.style.top = '0px';
                  list.style.transitionDuration = '0s';

              },2000);
        
    },5000); 
}

play();