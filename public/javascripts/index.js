let content = document.querySelector('#content');
let send = document.querySelector('#send');
let list = document.querySelector('#list');


send.addEventListener('click', function(e){
    console.log('send', e);
    let content_value = content.value;
    if(content_value){
        let xhr = new XMLHttpRequest();
        xhr.open('post', '/addContent');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({"content": content_value}));
        xhr.onload = function(){
            let originData = JSON.parse(xhr.responseText);
            console.log('originData', originData);
            if(originData.message === '成功'){
                let result = originData.result;
                let str = '';
                for(item in result)
                str += 
                `<li>
                    <span>${result[item].content}</span>
                    <button class="remove" data-key="${item}">移除</button>
                </li>`
                list.innerHTML = str;
            }else{
                alert('新增有誤！');
            }
        }
    }else{
      alert('請輸入值！');
    }
});

// dynamic addeventlistener
document.addEventListener('click',function(e){
    if(e.target && e.target.className == 'remove'){
      console.log('e.target', e.target.getAttribute('data-key'));
      const key = e.target.getAttribute('data-key');
      confirmDelete(key);
    }
});


// confirm delete
function confirmDelete(key){
  const c = confirm("是否要刪除？");
  if (c === true) {
    let xhr = new XMLHttpRequest();
    xhr.open('delete', '/deleteContent');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({"id": key}));
    xhr.onload = function(){
        let originData = JSON.parse(xhr.responseText);
        console.log('originData', originData);
        if(originData.message === '成功'){
            let result = originData.result;
            let str = '';
            for(item in result)
            str += 
            `<li>
                    <span>${result[item].content}</span>
                    <button class="remove" data-key="${item}">移除</button>
                </li>`
                list.innerHTML = str;
            }else{
                alert('新增有誤！');
            }
        }
  }
}