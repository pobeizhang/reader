(function(){
	var Util=(function(){
		var prefix='html5_reader_';
		var StorageGetter=function(key){
			return localStorage.getItem(prefix+key);
		}
		var StorageSetter=function(key,val){
			return localStorage.setItem(prefix+key,val);
		}
		return {
			StorageGetter:StorageGetter,
			StorageSetter:StorageSetter
		}
	})();

	var Dom={
		top_nav:$('#top-nav'),
		bottom_nav:$('.bottom_nav'),
		font_container:$('.font-container')
	};

	var Win=$(window);
	var Doc=$(document);
	var initFontSize=14;
	var Root=$('#fiction_container');
	var initFontSize=parseInt(Util.StorageGetter('font_size'));
	var bk_container=$('.bk-container');
	var background=Util.StorageGetter('background');
	var index=Util.StorageGetter('index');
	var night_button=$('#night-button');

	if(!background && !index){
		background='#f7eee5';
		index=1;
	}
	if(index == 5){
		night_button.find('span').html('白天');
		night_button.find('i').html('&#xe71f;');
	}else{
		night_button.find('span').html('夜间');
		night_button.find('i').html('&#xe72a;');
	}
	Root.css('background',background);
	$('.bk-container-' + index).find('div').addClass('bk-container-current');
	$('.bk-container-' + index).siblings().find('div').removeClass('bk-container-current');

	if(!initFontSize){
		initFontSize = 14;
	}

	Root.css('font-size',initFontSize);

	//整个项目的入口函数
	function main(){
		
		EventHandle();
	}

	//实现和阅读器相关的数据交换的方法
	function ReaderModel(){
		
	}

	//渲染基本的UI结构
	function ReaderBaseFrame(){
		
	}

	//交互的时事件绑定
	function EventHandle(){
		
		$('#action_mid').click(function(){
			if(Dom.top_nav.css('display') == 'none'){
				Dom.bottom_nav.show();
				Dom.top_nav.show();
			}else{
				Dom.bottom_nav.hide();
				Dom.top_nav.hide();
				Dom.font_container.hide();
				$(this).find('i').css({'color':'#fff'});
			}
		});

		//唤起字体的面板
		$('#font-button').click(function(){
			if(Dom.font_container.css('display') == 'none'){
				Dom.font_container.show();
				$(this).find('i').css({'color':'#ff7a00'});
			}else{
				Dom.font_container.hide();
				$(this).find('i').css({'color':'#fff'});
			}
		});

		//字号大小
		$('#large-font').click(function(){
			if(initFontSize > 20){
				return;
			}
			initFontSize += 1;
			Root.css('font-size',initFontSize);
			Util.StorageSetter('font_size',initFontSize);
		});
		$('#small-font').click(function(){
			if(initFontSize < 12){
				return;
			}
			initFontSize -=1;
			Root.css('font-size',initFontSize);
			Util.StorageSetter('font_size',initFontSize);
		});

		//通过字体模块中的背景切换来设置背景
		bk_container.click(function(){
			background=$(this).css('background');
			Root.css('background',background);
			$(this).siblings().find('div').removeClass('bk-container-current');
			$(this).find('div').addClass('bk-container-current');
			index=$(this).index();
			if(index==5){
				night_button.find('span').html('白天');
				night_button.find('i').html('&#xe71f;');
			}else{
				night_button.find('span').html('夜间');
				night_button.find('i').html('&#xe72a;');
			}
			Util.StorageSetter('background',background);
			Util.StorageSetter('index',index);
		});

		//夜间模式和白天模式切换－－－－触发背景切换的事件
		$('#night-button').click(function(){
			if(index == 5){
				night_button.find('span').html('夜间');
				night_button.find('i').html('&#xe72a;');
				index=1;
				$('.bk-container-' + index).find('div').addClass('bk-container-current');
				$('.bk-container-' + index).siblings().find('div').removeClass('bk-container-current');
				Root.css('background','#f7eee5');
				Util.StorageSetter('background','#f7eee5');
			}else{
				night_button.find('span').html('白天');
				night_button.find('i').html('&#xe71f;');
				Root.css('background','#283548');
				index=5;
				$('.bk-container-' + index).find('div').addClass('bk-container-current');
				$('.bk-container-' + index).siblings().find('div').removeClass('bk-container-current');
				Util.StorageSetter('background','#283548');
				Util.StorageSetter('index',index);
			}
		});

		Win.scroll(function(){
			Dom.bottom_nav.hide();
			Dom.top_nav.hide();
			Dom.font_container.hide();
			$(this).find('i').css({'color':'#fff'});
		});
	}

	main();

})();
















