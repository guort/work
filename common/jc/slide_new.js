// JavaScript Document
function slide(){
	this.initialize.apply(this,arguments);
	
};
slide.prototype={
	constructor:slide,
	initialize:function(options){
		var options=options||{};
		this.isScroll=options.isScroll||false;
		this.scrollArea=options.scrollArea;
		this.prevBtn=options.prevBtn;
		this.nextBtn=options.nextBtn;
		this.scrollListWidth=options.scrollListWidth;
		this.dot=options.dot;
		this.count=options.count-1;
		this.IDName=options.IDName;
		this.scrollList=options.scrollList;
		this.scrollNum=options.scrollNum||1;
		this.time=options.time||400;
		this.intervalTime=options.intervalTime||4000;
		this.direction=options.direction;
		this.scroll();
	},
	scroll:function(){
		var that=this;
		var bStop=false; //开关;
		var timer=null;
		var index=0;
		var scrollListSize=this.scrollListWidth;              //滚动个体的宽度
		this.scrollArea.style.width=scrollListSize*this.scrollList.length+'px';	   //滚动所有个体的宽度
		vJson=-scrollListSize*this.scrollNum;
		fixdJson={'marginLeft':0};
		function prevFn(){
			if(bStop){return}else{bStop=true};
			for(var i=0;i<that.scrollNum;i++){
				that.scrollArea.insertBefore(that.scrollArea.lastElementChild,that.scrollArea.firstElementChild);
			};
			that.scrollArea.style.marginLeft=vJson+'px';
			startMove(that.scrollArea,fixdJson,{type:'ease-out',time:that.time,fn:function(){
				if(that.count){
					index--;
					if(index<0)index=that.count;
					that.dot.querySelector('.cur').className='';
					that.dot.children[index].className='cur';
				};
				bStop=false;
			}});
		};
		function nextFn(){
			if(bStop){return}else{bStop=true};
			startMove(that.scrollArea,{'marginLeft':vJson},{type:'ease-out',time:that.time,fn:function(){
				that.scrollArea.style.marginLeft=0;
				for(var i=0;i<that.scrollNum;i++){
					that.scrollArea.appendChild(that.scrollArea.firstElementChild);
				};
				if(that.count){
					index++;
					if(index>that.count)index=0;
					that.dot.querySelector('.cur').className='';
					that.dot.children[index].className='cur';
				};
				bStop=false;
			}});
		};
		if(this.prevBtn){
			this.prevBtn.onclick=function(){
				prevFn();
			};
		};
		if(this.nextBtn){
			this.nextBtn.onclick=function(){
				nextFn();
			};
		};
		touch.on(that.scrollArea, 'swiperight', function(ev){
			clearInterval(timer);
			prevFn();
			auto();
		});
		touch.on(that.scrollArea, 'swipeleft', function(ev){
			clearInterval(timer);
			nextFn();
			auto();
		});
		function auto(){
			if(that.isScroll){
				timer=setInterval(function(){
					if(document.getElementById(that.IDName)){
						nextFn();
					}else{
						clearInterval(timer);
					};
				},that.intervalTime);
			};
		};
		auto();
	}
};
	
function getStyle(obj, name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}
/*
type：
匀速：	'linear'
加速：	'ease-in'
减速：	'ease-out'
*/
function startMove(obj, json, options)
{
	//type, time, fn
	options=options||{};
	options.type=options.type||'linear';
	options.time=options.time||700;
	var start={};
	var dis={};
	for(var name in json){
		if(name=='opacity'){
			start[name]=parseFloat(getStyle(obj, name));
		}else{
			start[name]=parseInt(getStyle(obj, name));
		};
		dis[name]=json[name]-start[name];
	};
	var count=Math.round(options.time/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		for(var name in json){
			switch(options.type){
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			};
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			};
		};
		if(n==count){
			clearInterval(obj.timer);
			options.fn && options.fn();
		}
	}, 30);
};

