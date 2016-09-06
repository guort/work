var Prompt = function(options){
	this.init(options);
};
Prompt.prototype = {
	init:function(options){
		this.options = options || {};
		this.id = this.options.id || 'prompt';
		this.width = this.options.width || "50%";
		this.type = this.options.type || "confirm";
		this.title = this.options.title || '';
		this.content = this.options.content || '';
		this.cancelBtn = this.options.cancelBtn || '取消';
		this.okBtn = this.options.okBtn || '确认';
		this.animation = this.options.animation || '';
		this.okCallback = function(){
			this.options.okCallback();
		};
		this.cancelCallback = function(){
			this.options.cancelCallback();
		};
		this.create();
	},
	create:function(){
		var ele = document.createElement("div");
		ele.id = this.id;
		ele.className = "prompt";
		var html = '<div class="p_cell">'
			+ '			<div class="p_inner '+ this.animation +'" style="width:'+ this.width +'">'
			+ (this.title == '' ? '' : '<div class="p_title">'+ this.title +'</div>')
			+ '				<div class="p_content">'+ this.content +'</div>'
			+ '				<div class="p_btns">'
			+ '					<b class="p_btn_cancel">'+ this.cancelBtn +'</b>'
		switch(this.type){
			case "confirm":
				html += '		<b class="p_btn_ok">'+ this.okBtn +'</b>'
				break;
			case "alert":
				break;
		}
		html += '			</div>';
			+ '			</div>'
			+ '		</div>';
		ele.innerHTML = html;
		document.body.appendChild(ele);
		this.bindEvent();
	},
	remove:function(){
		document.body.removeChild(document.getElementById(this.id));
	},
	bindEvent:function(){
		var self = this;
		document.body.querySelector(".p_btn_cancel").onclick = function(){
			self.cancelCallback();
		}
		if(this.type == "confirm"){
			document.body.querySelector(".p_btn_ok").onclick = function(){
				self.okCallback();
			}
		}
	}
}