var SucessLogin=false

/*Active Menu*/

var categoryMenu=document.querySelector('.header-bar__item-menu')
var category=document.querySelector('.header-bar__category')
var itemHeaderBarDownload=document.querySelector('.header-bar__item--hover')
var headerBarDownload=document.querySelector('.header-bar__download')
var ItemLogin=document.querySelector('.header-bar__item--login');
var formLogin=document.querySelector('.header-bar__login');
var CountriesClick=document.querySelector('.header-bar__link--country-click');
var  Countries=document.querySelector('.header-bar__login-countries')
var ClickTranfer=document.querySelector('.header-bar__item-tran')
var Tranfer=document.querySelector('.header-bar__selection-tran')
var ClickWhere=document.querySelector('.header-bar__item-where');
var Where=document.querySelector('.header-bar__selection-where')
var ClickActivity=document.querySelector('.header-bar__item-activity');
var Activity=document.querySelector('.header-bar__selection-activity');
var ClickAdditional=document.querySelector('.header-bar__item-additional');
var Additional=document.querySelector('.header-bar__selection-additional');
function active(click,activess,selector)
{
    var selects=document.querySelectorAll('.header-bar__selection-active')
    click.onclick=function()
    {
        for(var i=0;i<selects.length;i++)
        {
           if(selects[i]!=activess)
           {
               selects[i].classList.remove('active')
           }
        }
        activess.classList.toggle('active')
    }
}
active(categoryMenu,category,'.header-bar__selection-active');
active(itemHeaderBarDownload,headerBarDownload,'.header-bar__selection-active');
 active(ItemLogin,formLogin,'.header-bar__selection-active')
active(CountriesClick,Countries,'.header-bar__selection-active')
 active(ClickTranfer,Tranfer,'.header-bar__selection-active')
active(ClickWhere,Where,'.header-bar__selection-active')
active(ClickActivity,Activity,'.header-bar__selection-active')
active(ClickAdditional,Additional,'.header-bar__selection-active')

/*Border-Login*/
function AddClassChildToParent(parentElement,childElement,classs,event1,event2)
{
    if(event1)
    {
        childElement[event1]=function()
        {
            parentElement.classList.add(classs)
        }
    }
    if(event2)
    {
        childElement[event2]=function()
        {
            parentElement.classList.remove(classs)
        }
    }
   
}
var InPutParentElement1=document.querySelector('.header-bar__login-cover-1')
var InPutParentElement2=document.querySelector('.header-bar__login-cover-2')
var PhoneInput=document.querySelector('.header-bar__login-phone')
var PassInput=document.querySelector('.header-bar__login-password')
AddClassChildToParent(InPutParentElement1,PhoneInput,'focuss','onfocus','onblur')
AddClassChildToParent(InPutParentElement2,PassInput,'focuss','onfocus','onblur')

/*See PassWord*/
var PassWord=document.querySelector('.header-bar__login-password');
var EyesPassWord=document.querySelector('.header-bar__login-eye')
function SeePassWord(ClickElement,InputElement)
{
    ClickElement.onclick=function()
    {
        if(InputElement.type==='password')
        {
            InputElement.type='text'
        }
        else
        {
            InputElement.type='password'
        }
    }
}
SeePassWord(EyesPassWord,PassWord)

/*Login*/
function CheckInput(InputClass,mess)
{
var inputElement=document.querySelector(InputClass)
var ErrorElement=inputElement.parentElement.parentElement.querySelector('.header-bar__login-input-error')
inputElement.onblur=function()
{
    if(!inputElement.value)
    {
        ErrorElement.innerText=mess;
        inputElement.parentElement.classList.add('invalid')
    }
}
    inputElement.oninput=function()
    {
        ErrorElement.innerText='';
            inputElement.parentElement.classList.remove('invalid')
    }
}
function CheckEmail(InputClass,mess)
{
    var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var phoneno =/^(09|03|07|08)\d{8}$/;
    var inputElement=document.querySelector(InputClass)
    var ErrorElement=inputElement.parentElement.parentElement.querySelector('.header-bar__login-input-error')
    inputElement.onblur=function()
        { 
            if(!phoneno.test(inputElement.value)&&!regex.test(inputElement.value))
            { 
                ErrorElement.innerText=mess;
                inputElement.parentElement.classList.add('invalid')
            }
        }
    inputElement.oninput=function()
    {
        ErrorElement.innerText='';
            inputElement.parentElement.classList.remove('invalid')
    }
 } 
 CheckEmail('.header-bar__login-phone','Mục này phải là email hoặc SĐT')
 CheckInput('.header-bar__login-password','Mục bắt buộc')
function Login(API,btnloginse,passwordse,emailorphonese,mess1,mess2,Logineed)
{
    var error=true;
    var btnlogin=document.querySelector(btnloginse)
    var password=document.querySelector(passwordse)
    var emailorphone=document.querySelector(emailorphonese)
    var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var phoneno =/^(09|03|07|08)\d{8}$/;
    var ErrorElement1=password.parentElement.parentElement.querySelector('.header-bar__login-input-error')
    var ErrorElement2=emailorphone.parentElement.parentElement.querySelector('.header-bar__login-input-error')
    btnlogin.onclick=function()
    {
        if(!password.value)
        {
            ErrorElement1.innerText=mess2;
            password.parentElement.classList.add('invalid')
            error=false
        }
        else
        {
            ErrorElement1.innerText='';
            password.parentElement.classList.remove('invalid')
        }
        if(!phoneno.test(emailorphone.value)&&!regex.test(emailorphone.value))
        {
            ErrorElement2.innerText=mess1;
            emailorphone.parentElement.classList.add('invalid')
            error=false
        }
        else{
            ErrorElement2.innerText='';
            emailorphone.parentElement.classList.remove('invalid')
        }
        if(error)
        {
            var pass=password.value;
            var acc=emailorphone.value;
            fetch(API)
            .then(function(reponse)
            {
                return reponse.json()
            })
            .then(function(data)
            {
               var user =data.find(function(a)
               {
                return a.Account==acc &&a.PassWord==pass
               }
               )
               var loading=document.querySelector('.loading')
               loading.style.display='flex'
               setTimeout(function()
               {
               loading.style.display='none'
               if(!user)
               {
                     alert('Tài khoản hoặc mật khẩu không đúng')
               }
               else
               {
                 Logineed(API,'.login','.signup','.header-bar__list.full',user.avatar,user.name,user.Account,user.id)
                 SucessLogin=true;
               }
               },500)
            })
        }
        
    }
}
// Logined('.login','.signup','.header-bar__list.full',
// 'https://ik.imagekit.io/tvlk/image/imageResource/2023/05/09/1683597779257-949eecfbb570151eb5ea6732ff646fd9.jpeg?tr=h-230,q-75,w-472',
// 'Thanh','0349314322','1234')
function ResetPass(API,btnsel,oldpasssel,newpassel,userid)
{
    btn=document.querySelector(btnsel)
    oldpass=document.querySelector(oldpasssel)
    newpass=document.querySelector(newpassel)
    btn.onclick=function()
    {
        fetch(API+'/'+userid)
        .then(function(reponse)
        {
            return reponse.json()
        })
        .then(function(data)
        {
            var error=oldpass.parentElement.parentElement.querySelector('.header-bar__login-input-error')
            if(data.PassWord==oldpass.value)
            {
                var a={
                    PassWord:newpass.value
                }
                alert('Đổi mật khẩu thành công')
                error.innerText=''
                oldpass.parentElement.classList.remove('invalid')
                fetch(API+'/'+`${userid}`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(a)
                })
                oldpass.value=''
                newpass.value=''
            }
            else
            {
                error.innerText='Mật khẩu không chính xác'
                oldpass.parentElement.classList.add('invalid')
            }
        })
    }
}
function Logined(API,Loginse,Signupse,Listse,avatar,name,acc,userid)
{
   var user=document.createElement("li")
    user.classList.add('header-bar__item')
    user.innerHTML=`
    <img src="${avatar}" alt="" class="header-bar__avatar header-bar__avatar--ac">
    <span class="header-bar__user-name">${name}</span>
    <div class="user-info">
        <div class="user-info__content">
            <div class="user-info__content-acc"> 
                <img src="${avatar}" class="user-info__content-ava" alt="">
                <div class="user-info__content-info">
                    <span class="user-info__content-name"> ${name}</span>
                    <div class="user-info__content-account"> ${acc}</div>
                </div>
            </div>
            <div class="user-info__content-page user-info__content-item">
                <a href="" class="user-info__content-page">Trang cá nhân</a>
            </div>
            <div class="user-info__content-booked user-info__content-item">
                <a href="" class="user-info__content-page">Dịch vụ đã đặt</a>
            </div>
            <div class="user-info__content-setting user-info__content-item">
                <a href="" class="user-info__content-set">Cài đặt</a>
            </div>
            <div class="user-info__content-resetpass user-info__content-item">
                <span class="user-info__content-reset">Đổi mật khẩu</span>
                <div class="user-info__content-resetpass-ac">
                <div class="user-info__content-resetpass-curr">
                    <div class="user-info__content-resetpass-curr-parent">
                        <input placeholder="Mật khẩu hiện tại" class="user-info__content-resetpass-curr-inp" type="password" >
                    </div>
                    <span class="header-bar__login-input-error"></span>
                </div>
                    <div class="user-info__content-resetpass-new">
                        <input placeholder="Mật khẩu mới" class="user-info__content-resetpass-new-input" type="password">
                        <div class="user-info__content-resetpass-new-eye">
                            <i class="fa-regular fa-eye"></i>
                        </div>
                    </div>
                    <div class="user-info__content-resetpass-btn btn">Xong</div>
            </div>
            </div>
            <div class="user-info__content-changeava btn ">
                Đổi ảnh đại diện
            </div>
            <div class="user-info__content-logout btn">
                <a href="" >Đăng xuất</a>
            </div>
        </div>
    </div>
    `
    var Login=document.querySelector(Loginse)
    var Signup=document.querySelector(Signupse)
    Login.remove()
    Signup.remove()
    var List=document.querySelector(Listse)
    List.appendChild(user)
    var eyeretpass=document.querySelector('.user-info__content-resetpass-new-eye')
var newpass=document.querySelector('.user-info__content-resetpass-new-input')
SeePassWord(eyeretpass,newpass)
var btn=document.querySelector('.user-info__content-reset')
var ret=document.querySelector('.user-info__content-resetpass-ac')
active(btn,ret)
ResetPass(API,'.user-info__content-resetpass-btn','.user-info__content-resetpass-curr-inp','.user-info__content-resetpass-new-input',userid)
active(document.querySelector('.header-bar__avatar--ac'),document.querySelector('.user-info'),'')
}
Login('http://localhost:3000/ProfileUser','.header-bar__login-click-btn','.header-bar__login-password','.header-bar__login-phone','Mục này phải là email hoặc SĐT','Mục bắt buộc',Logined)
/*Introduce*/
var ScrollIntroduce=document.querySelector('.introduce-list')
var btnback=document.querySelector('.introduce-add-btn-back')
var btnnext=document.querySelector('.introduce-add-btn-next')
var ItemIntroduce=document.querySelector('.introduce-item')
function ControlScroll(Scroll,nextbtn,backbtn,length)
{
    nextbtn.onclick=function()
    {
        backbtn.style.display='flex'
        if(Math.ceil(Scroll.scrollLeft+Scroll.clientWidth)==Scroll.scrollWidth)
        {
            nextbtn.style.display='none'
        }
        Scroll.scrollLeft+=length
    }
    backbtn.onclick=function()
    {
        nextbtn.style.display='flex'
        if(Scroll.scrollLeft==0)
        {
            backbtn.style.display='none'
        }
       Scroll.scrollLeft-=length
    }
   
}

ControlScroll(ScrollIntroduce,btnnext,btnback,ItemIntroduce.clientWidth)



/*BOOk-ROOM*/
 var BtnFormTran=document.querySelector('.book-room-button-stran-btn')
 var TextElementRoom=document.querySelectorAll('.book-room-server-text')
 function Tran(BtnFormTran,Elementtext)
 {
    var icon=BtnFormTran.querySelector('i')
    BtnFormTran.onclick=function()
    {
            icon.classList.toggle('fa-chevron-right')
            icon.classList.toggle('fa-chevron-left')
            Array.from(Elementtext).forEach(function(curr)
            {
                curr.classList.toggle('active')
            })
    }
 }
 Tran(BtnFormTran,TextElementRoom)
 
/*Open modal*/
var BookRoom=document.querySelector('.book-room')
var Modal=document.querySelector('.modal')
function AddClass(click,activity,NameClass)
{
    click.onclick=function()
    {
        activity.classList.add(NameClass)
    }
}
AddClass(BookRoom,Modal,'active')
active(Modal,Modal,'.header-bar__selection-active')


/*---Go Back--*/
var BtnCheck=document.querySelector('.book-room__checkbox')
var DateTo=document.querySelector('.book-room__container--to')
active(BtnCheck,DateTo,'.header-bar__selection-active')


/*Render Country and AirPort*/
var CountryApi='http://localhost:3000/Countries'
fetch(CountryApi)
.then(function(reponse)
{
    return reponse.json()
})
.then(function(Countries){
   var Parents=document.querySelectorAll('.book-room__selection-list')
  var html=''
  Countries.forEach(function(curr)
  {
    html+=`
    <li class="book-room__selection-item">
        <span class="book-room__selection-city">${curr.NameCountry}</span>
        <span class="book-room__selection-airport">${curr.NameAirport}</span>
    </li>`
  })
 Array.from(Parents).forEach(function(cur)
 {
    cur.innerHTML=html;
 })
 var CountriesAndAirport=document.querySelectorAll('.book-room__selection-item')
 return CountriesAndAirport
})
.then(function(a)
{
SelectCountry(a,'.book-rom__country-input','.book-room__selection-item')
    
}
)
/*Select country and aiport*/
function SelectCountry(Element,InputSelector,LiSelector)
{
 for(var i=0;i<Element.length;i++)
 {
    Element[i].onclick=function(e)
    {
        var LiElement=e.target
      if(!LiElement.matches(LiSelector))
      {
        LiElement=LiElement.parentElement
      }
      var Parent=LiElement.parentElement.parentElement.parentElement
      var Input=Parent.querySelector(InputSelector)
        var NameCountry=LiElement.querySelector('.book-room__selection-city').innerText
        var NameAirport=LiElement.querySelector('.book-room__selection-airport').innerText.slice(0,3)
       var Find=NameCountry.indexOf(',')
       NameCountry=NameCountry.slice(0,Find)
       Input.value=`${NameCountry} (${NameAirport})`
    }
 }
}

/*Choose chair*/
function ChooseChair(MinusSelector,AddSelector,max)
{

    var Minus=document.querySelectorAll(MinusSelector)
    var Add=document.querySelectorAll(AddSelector)
    for(var i=0;i<Minus.length;i++)
    {
        Minus[i].onclick=function(e)
        {
            var Parent=e.target.parentElement
           var Number=parseFloat(Parent.querySelector('.book-room__to-u-number-num').innerText)
         if(Number>0)
         {
            Number=Number-1;
            Parent.querySelector('.book-room__to-u-number-num').innerText=Number.toString()
         }          
        }
    }
    for(var i=0;i<Add.length;i++)
    {
        Add[i].onclick=function(e)
        {
            var Parent=e.target.parentElement
            var Number=parseFloat(Parent.querySelector('.book-room__to-u-number-num').innerText)
            if(Number<max)
         {
            Number=Number+1;
            Parent.querySelector('.book-room__to-u-number-num').innerText=Number.toString()
         }       
          
        }
        
    }
}

ChooseChair('.book-room__to-u-number-minus','.book-room__to-u-number-add',7)
function ChooseNumInput(Input,NumberItem,ElementComplete)
{
    ElementComplete.onclick=function()
    {
        var TextInput=''
        var NumberAll=document.querySelectorAll(NumberItem)
        for(var i=0;i<NumberAll.length;i++)
        {
            var Text=NumberAll[i].querySelector('.book-room__to-u-number-type').innerText
            var SL=NumberAll[i].querySelector('.book-room__to-u-number-num').innerText
            TextInput +=`${SL} ${Text}, `
        }
       TextInput=TextInput.slice(0,TextInput.length-2)
       Input.value=TextInput
    }
}
var In=document.querySelector('.book-room__to-u-select-input')
var ElementComp=document.querySelector('.book-room__to-u-number-complete')
ChooseNumInput(In,'.book-room__to-u-number-item',ElementComp)

/*Choose type*/
function ChooseType(InputSelector,ElementSelector)
{
    var Input=document.querySelector(InputSelector)
    var Elementypes=document.querySelectorAll(ElementSelector)
    for(var i=0;i<Elementypes.length;i++)
    {
        Elementypes[i].onclick=function(e)
        {
            Input.value=e.target.innerText.trim()
        }
    }
}
ChooseType('.book-room__to-u-rank-input','.book-room__to-u-rank-item')


/*Control Scroll Product*/

/*Product*/
var ScrollProduct=document.querySelector('.product-book__img-list')
var BtnProductBack=document.querySelector('.product-book__img--back')
var BtnProductNext=document.querySelector('.product-book__img--next')
ControlScroll(ScrollProduct,BtnProductNext,BtnProductBack,432)

/*Render Product hightlight*/
function AddStyle(Click,It)
 {
    var All=document.querySelectorAll(Click)
    Array.from(All).forEach(function(curr)
    {
        if(curr!=It)
        {
            curr.classList.remove('active')
        }
        It.classList.add('active')
    })
 }
function Render(API,ParentSelector,addclass)
{
    var Parent=document.querySelector(ParentSelector)
    var html=""
    fetch(API)
    .then(function(reponse)
    {
        return reponse.json()
    })
    .then(function(data)
    {
        var dem=0;
        data.forEach(function(curr)
        {
            dem++;
            html+=`
            <div class="product-book__img-item ${addclass}">
                <a href="" class="product-book__img-link">
                    <img class="product-book__img-img" src="${curr.url}" alt="">
                </a>
            </div>`
        })
        Parent.innerHTML=html;
    })
}
Render('http://localhost:3000/TicketPlane','.product-book__img-list','')
function ClickElementProductServer(ElementSelectors,callback,addclass,parent,callback2,API1,API2,API3,API4,API5)
{
    var Elements=document.querySelectorAll(ElementSelectors)
    Array.from(Elements).forEach(function(curr)
    {
        curr.onclick=function(e)
        {
           var scrolll=document.querySelector(parent)
           scrolll.scrollLeft=0;
            var LiElement=e.target
            if(!LiElement.matches(ElementSelectors))
            {
                LiElement=LiElement.parentElement
            }
            var IdServer=LiElement.id
            switch(IdServer)
            {
                case "ser-1":
                    callback(API1,parent,addclass)
                    callback2('.product-book__server-item.serv',LiElement)
                    break;
                case "ser-2":
                    callback(API2,parent,addclass)
                    callback2('.product-book__server-item.serv',LiElement)
                    break;
                case "ser-3":
                    callback(API3,parent,addclass)
                    callback2('.product-book__server-item.serv',LiElement)
                    break;
                case "ser-4":
                    callback(API4,parent,addclass)
                    callback2('.product-book__server-item.serv',LiElement)
                    break;
                case "ser-5":
                    callback(API5,parent,addclass)
                    callback2('.product-book__server-item.serv',LiElement)
                    break;
            }
        }
    })
}

ClickElementProductServer('.product-book__server-item',Render,'','.product-book__img-list',AddStyle,
'http://localhost:3000/TicketPlane','http://localhost:3000/Hotel','http://localhost:3000/Bus','http://localhost:3000/TransferAirport','http://localhost:3000/SightSeeing')
var ser1=document.querySelector('#server-id-1')
var BookRoomServer=document.querySelector('.book-room-select')
active(ser1,BookRoomServer,'.header-bar__selection-active')


/*Render Country hot*/
function RenderCountry(API,ParentSelector)
{
    var html=''
 var Parent=document.querySelector(ParentSelector)
 fetch(API)
 .then(function(reponse)
 {
    return reponse.json()
 })
 .then(function(data)
 {
    data.forEach(function(curr)
    {
        html+=`
        <li class="product-country__body-item col l-3 m-6 c-12">
        <a href="" class="product-country__body-link">
            <img src="${curr.url}" alt="" class="product-country__body-img">
            <div class="product-country__body-desription">
                <span class="product-country__body-name">${curr.name}</span>
                <span class="product-country__body-accommon">${curr.Num}</span>
            </div>
        </a>
    </li>`
    })
    Parent.innerHTML=html
 })
}
RenderCountry('http://localhost:3000/HotCountry','.product-country__body-list')
Render('http://localhost:3000/LoveCity','.love-city','love-city-item')
var BtnNextLoveCity=document.querySelector('.love-city-next')
var BtnBackLoveCity=document.querySelector('.love-city-back')
var ListLoveCity=document.querySelector('.love-city')
ControlScroll(ListLoveCity,BtnNextLoveCity,BtnBackLoveCity,258)
/*Travel Server Render*/

function RenderTravelServer(API,ParentSelector,addclass)
{
    var Parent=document.querySelector(ParentSelector)
    var html=""
    fetch(API)
    .then(function(reponse)
    {
        return reponse.json()
    })
    .then(function(data)
    {
        data.forEach(function(curr)
        {
            html+=`
            <div class="product-book__img-item ${addclass}">
                <a href="" class="product-book__img-link">
                    <img class="product-book__img-img" src="${curr.url}" alt="">
                </a>
                <span class="travel-server__des">${curr.des}</span>
                <span class="travel-server__oldprice">${curr.OldPrice}</span>
                <span class="travel-server__price">${curr.Price}</span>
            </div>`
        })
        Parent.innerHTML=html;
    })
}


function ClickElementTravel(ElementSelectors,callback,addclass,parent,callback2,API1,API2,API3,API4,API5)
{
    var Elements=document.querySelectorAll(ElementSelectors)
    Array.from(Elements).forEach(function(curr)
    {
        curr.onclick=function(e)
        {
           var scrolll=document.querySelector(parent)
           scrolll.scrollLeft=0;
            var LiElement=e.target
            if(!LiElement.matches(ElementSelectors))
            {
                LiElement=LiElement.parentElement
            }
            var IdServer=LiElement.id
            switch(IdServer)
            {
                case "serve-1":
                    callback(API1,parent,addclass)
                    callback2('.travel-i',LiElement)
                    break;
                case "serve-2":
                    callback(API2,parent,addclass)
                    callback2('.travel-i',LiElement)
                    break;
                case "ser-3":
                    callback(API3,parent,addclass)
                    callback2('.travel-i',LiElement)
                    break;
                case "ser-4":
                    callback(API4,parent,addclass)
                    callback2('.travel-i',LiElement)
                    break;
                case "ser-5":
                    callback(API5,parent,addclass)
                    callback2('.travel-i',LiElement)
                    break;
            }
        }
    })
}
RenderTravelServer('http://localhost:3000/BookServer','.travel-server','travel-server-item')
ClickElementTravel('.travel-i',RenderTravelServer,'travel-server-item','.travel-server',AddStyle,
'http://localhost:3000/BookServer','http://localhost:3000/BookServer','','','')
var TravelList=document.querySelector('.travel-server')
var TravelBtnBack=document.querySelector('.travel-server-btn--back')
var TravelBtnnext=document.querySelector('.travel-server-btn--next')
ControlScroll(TravelList,TravelBtnnext,TravelBtnBack,258)


/*Country*/

function RenderInternationalTravel(API,ParentSelector)
{
    var html='';
    var Parent=document.querySelector(ParentSelector)
    fetch(API)
    .then(function(a){
        return a.json()
    }
    )
    .then(function(data)
    {
        data.forEach(function(curr)
        {
            html+=`
            <li class="Inter-country-item col l-2 m-4 c-12">
                <a href="" class="Inter-country-link">
                    <img src="${curr.url}" alt="" class="Inter-country-img">
                    <div class="Inter-country-des">
                        <span class="Inter-country__namecity">${curr.CityName}</span>
                        <span class="Inter-country__namecountry">${curr.CountryName}</span>
                    </div>
                </a>
            </li>
            `
        })
    Parent.innerHTML=html;
    })
}
RenderInternationalTravel('http://localhost:3000/TravelInternational','.Inter-country')


/*Posts travel*/
function RenderTravelPost(API,ParentSelector,addclass)
{
    var Parent=document.querySelector(ParentSelector)
    var html=""
    fetch(API)
    .then(function(reponse)
    {
        return reponse.json()
    })
    .then(function(data)
    {
        data.forEach(function(curr)
        {
            html+=`
            <div class="posts-travel-item">
                <a href="" class="posts-travel-link">
                    <img src="${curr.url}" alt="" class="posts-travel-img">
                    <div class="posts-travel-des">
                        <span class="posts-travel-title">${curr.title}</span>
                        <span class="posts-travel-author">${curr.author}</span>
                        <span class="posts-travel-time">${curr.time}</span>
                    </div>
                </a>
            </div>
            `
        })
        Parent.innerHTML=html;
    })
}
RenderTravelPost('http://localhost:3000/PostsTravel','.posts-travel')
var PostTravelList=document.querySelector('.posts-travel')
var BtnBackPostTravel=document.querySelector('.posts-travel-btn--back')
var BtnNextPostTravel=document.querySelector('.posts-travel-btn--next')
ControlScroll(PostTravelList,BtnNextPostTravel,BtnBackPostTravel,260)


/*Control list partner*/


function ControlPartner(nextbtnse,backbtnse,listse)
{
     var nextbtn=document.querySelector(nextbtnse)
     var backbtn=document.querySelector(backbtnse)
     var lists=document.querySelectorAll(listse)
     var lenghlists=lists.length
     var moc=0
     backbtn.style.display='none'
     nextbtn.onclick=function()
     {
        moc-=100;
        if(moc==(lenghlists-1)*(-100))
        {
            nextbtn.style.display='none'
        }
        Array.from(lists).forEach(function(list)
        {
         list.style.transform=`translateX(${moc}%)`
        })
        backbtn.style.display='flex'
     }
     backbtn.onclick=function()
     {
        moc+=100;
        if(moc==0)
        {
            backbtn.style.display='none'
        }
        Array.from(lists).forEach(function(list)
        {
         list.style.transform=`translateX(${moc}%)`
        })
       nextbtn.style.display='flex'
     }
}

ControlPartner('.product-final-partner__hotel .product-final-partner__btn--next','.product-final-partner__hotel .product-final-partner__btn--back',
'.product-final-partner__hotel .product-final-partner-list-list')
ControlPartner('.product-final-partner__air .product-final-partner__btn--next','.product-final-partner__air .product-final-partner__btn--back',
'.product-final-partner__air .product-final-partner-list-list')


/*Slip Discover*/
function Slip(SlipSelector,ListNeedControlSle)
{
    var ListNeedControl=document.querySelectorAll(ListNeedControlSle)
    var Size=ListNeedControl[0].offsetLeft
    var SlipControl=document.querySelector(SlipSelector)
    Array.from(ListNeedControl).forEach(function(cur){
        cur.onclick=function(e)
        {
            console.log([e.target])
           SlipControl.style.transform=`translateX(${e.target.offsetLeft -(Size +12)}px)`

           Array.from(ListNeedControl).forEach(function(cur){
                if(cur!=e.target)
                {
                    cur.style.color='rgb(104, 113, 118)';
                }
           })
           e.target.style.color='var(--primary-color)'
        }
    }
    )
}
Slip('.product-discover__select-slip','.product-discover__select-item')



/*Sign up*/
CheckEmail('.signup-app__form-input-acc','Mục này phải là Email hoặc SĐT')
CheckInput('.signup-app__form-input-pass','Mục bắt buộc')
CheckInput('.signup-app__form-input-name','Mục bắt buộc')
var signuppass=document.querySelector('.signup-app__form-input-pass')
var eyepass=document.querySelector('.header-bar__login-eye--pass')
var signuppassed=document.querySelector('.signup-app__form-input-passed')
var eyepassed=document.querySelector('.header-bar__login-eye--passed')
SeePassWord(eyepass,signuppass)
SeePassWord(eyepassed,signuppassed)

function CheckInput(InputClass,mess)
{
var inputElement=document.querySelector(InputClass)
var ErrorElement=inputElement.parentElement.parentElement.querySelector('.header-bar__login-input-error')
inputElement.onblur=function()
{
    if(!inputElement.value)
    {
        ErrorElement.innerText=mess;
        inputElement.parentElement.classList.add('invalid')
    }
}
    inputElement.oninput=function()
    {
        ErrorElement.innerText='';
            inputElement.parentElement.classList.remove('invalid')
    }
}



function CheckMatch(Passse,Passedse,mess)
{
    var pass=document.querySelector(Passse)
    var passed=document.querySelector(Passedse)
    var ErrorElement=passed.parentElement.parentElement.querySelector('.header-bar__login-input-error')

    passed.onblur=function()
    {
        if(pass.value!=passed.value)
        {
            ErrorElement.innerText=mess;
            passed.parentElement.classList.add('invalid')
        }
    }
    passed.oninput=function()
    {
            ErrorElement.innerText='';
            passed.parentElement.classList.remove('invalid')
    }
}

CheckMatch('.signup-app__form-input-pass','.signup-app__form-input-passed','Mật khẩu không trùng khớp')

function SignUpApp(formsel,namesel,accsel,passsel,passedsel,signupbtnsel,API,callback)
{
    var error=false
    var form=document.querySelector(formsel)
    var name=document.querySelector(namesel)
     var acc=document.querySelector(accsel)
     var pass=document.querySelector(passsel)
     var passed=document.querySelector(passedsel)
    var BtnSignUp=document.querySelector(signupbtnsel)
    var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    var phoneno =/^(09|03|07|08)\d{8}$/
    var ErrorElement=name.parentElement.parentElement.querySelector('.header-bar__login-input-error')
    var ErrorElement1=acc.parentElement.parentElement.querySelector('.header-bar__login-input-error')
    var ErrorElement2=pass.parentElement.parentElement.querySelector('.header-bar__login-input-error')
    var ErrorElement3=passed.parentElement.parentElement.querySelector('.header-bar__login-input-error')
    BtnSignUp.onclick=function()
    {
        if(!pass.value)
        {
            error=true
            ErrorElement2.innerHTML='Mục bắt buộc'
            pass.parentElement.classList.add('invalid')
        }
        else
        {
            ErrorElement2.innerHTML=''
            pass.parentElement.classList.remove('invalid')
        }
        if(!name.value)
        {
            error=true
            ErrorElement.innerHTML='Mục bắt buộc'
            name.parentElement.classList.add('invalid')
        }
        else
        {
            ErrorElement.innerHTML=''
            name.parentElement.classList.remove('invalid')
        }
        if(!phoneno.test(acc.value)&&!regex.test(acc.value))
        { 
            error=true
            ErrorElement1.innerText='Mục này phải là Email hoặc SĐT';
            acc.parentElement.classList.add('invalid')
        }
        else
        {
            ErrorElement1.innerHTML=''
            acc.parentElement.classList.remove('invalid')
        }
        if(pass.value!=passed.value)
        {
            error=true
            ErrorElement3.innerHTML='Mật khẩu không trùng khớp'
            passed.parentElement.classList.add('invalid')
        }
        else
        {
            ErrorElement3.innerHTML=''
            passed.parentElement.classList.remove('invalid')
        }
        if(!error)
        {
            fetch(API)
            .then(function(reponse)
            {
                return reponse.json()
            })
            .then(function(data)
            {
                var user=data.find(function(a)
                {
                    return a.Account==acc.value
                })
                if(user)
                {
                    ErrorElement1.innerText='Tài khoản này đã tồn tại';
                    acc.parentElement.classList.add('invalid')
                }
                else
                {
                    var data=
                    {
                        Account:acc.value,
                        PassWord:pass.value,
                        name:name.value,
                        avatar:"https://ik.imagekit.io/tvlk/image/imageResource/2023/05/09/1683597779257-949eecfbb570151eb5ea6732ff646fd9.jpeg?tr=h-230,q-75,w-472"
                    }
                    form.style.display='none'
                    var loading=document.querySelector('.loading')
                    loading.style.display='flex'
                    setTimeout(function()
                    {
                    loading.style.display='none'
                    
                    },500)
                    fetch(API,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify(data)
                    })
                    .then(function(reponse){
                        return reponse.json()
                    }
                    )
                    .then(function(signed)
                    {
                        callback(API,'.login','.signup','.header-bar__list.full',signed.avatar,signed.name,signed.Account,signed.id)
                        SucessLogin=true
                    })
                }
            })
        }
    }
}
SignUpApp('.signup-app','.signup-app__form-input-name','.signup-app__form-input-acc',
'.signup-app__form-input-pass','.signup-app__form-input-passed','.signup-app-btn','http://localhost:3000/ProfileUser',Logined)
var signupbtn=document.querySelector('.signup')
var formsignup=document.querySelector('.signup-app')
var outsingup=document.querySelector('.signup-app__form-out')
var logintosignup=document.querySelector('.login-to-signup')
active(signupbtn,formsignup,'')
active(outsingup,formsignup,'')
active(logintosignup,formsignup,'')



/*Reser PassWord*/

