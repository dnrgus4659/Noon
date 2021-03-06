$(function(){
	var minrow = 0;
	var maxrow = 10;
	var endcheck = true;
	deletePreviewFolder();
	//이미지 불러오기
	var img = getImgList(minrow,maxrow);
	//해시태그 불러오기
	var hashtag = getHashTag(minrow,maxrow);
	boardList(minrow,maxrow,img,hashtag);
	//글쓰는 페이지 이동
	$("#writebtn").click(function(){
		location.href="writeboard.jsp";
	});
	//스크롤 내리면 자동으로 항목 불러오기
	$(window).on("scroll",function(){
		if($(window).scrollTop() == $(document).height() - $(window).height()){
			//화면에 보여줄 리스트가 있을 경우
			if(endcheck==true){
				minrow = minrow+5;
				maxrow = maxrow+5;
				img = getImgList(minrow,maxrow);
				hashtag = getHashTag(minrow,maxrow);
				endcheck = boardList(minrow,maxrow,img,hashtag);
			}else{
				endcheck = false;
				return false;
			}
		}
	});

	//삭제 버튼
	$(document).on("click",".delbtn",function(){
		var num = $(this).attr("num");
		var ch = confirm("해당 글을 삭제하시겠습니까?");
		if(ch==true){
			$.ajax({
				type: "post", 
				url: "deleteboard.jsp", 
				dataType: "html",
				async: false,
				data:{
					"num":num
				},
				success:function(data){
					boardList(row,img);
				}
			});
		}else{
			return false;
		}
	}); 
	//수정 버튼
	$(document).on("click",".delbtn",function(){
		$("frm").submit();		
	});
	//좋아요
	$(document).on("click",".likey",function(){
		var num = $(this).parents(".listform").attr("id");
		var src = $(this).attr("src");
		var cnt = 0;
		if(src=="../img/heart-full.png"){
			$(this).attr("src","../img/heart-empty.png");
			cnt = -1;
		}else{
			$(this).attr("src","../img/heart-full.png");
			cnt = +1;
		}
		$.ajax({
			type: "post", 
			url: "updatelike.jsp",
			dataType: "html",
			data:{
				"num":num,
				"likes":cnt
			},
			context: this,
			success:function(html){
				$(this).next("span").html(html);
			}
		});
		
	});

	//메뉴 버튼
	$(document).on("click",".menubtn",function(){
		var css = $(this).siblings(".btns").css("display");
		var posX = $(this).offset().left;
		var posY = $(this).offset().top;
		if(css=="none"){
			$(this).siblings(".btns").css("display","block");
			$(this).siblings(".btns").css("top",posY+20);
			$(this).siblings(".btns").css("left",posX-30);
		}else{
			$(this).siblings(".btns").css("display","none");
		}
	});
});//$(function) 끝




//해당 로그인 된 아이디의 임시 폴더 삭제
function deletePreviewFolder(){
	$.ajax({
		type: "post", 
		url: "deletepreviewfolder.jsp",
		dataType: "html",
		success:function(data){
		}
	});
}
//글 목록
function boardList(minrow,maxrow,img,hashtag){
	var endcheck = true;
	$.ajax({
		type: "post", 
		url: "getboardlist.jsp",
		data:{
			"minrow":minrow,
			"maxrow":maxrow
		},
		dataType: "json",
		async: false,
		success:function(data){
			endcheck = listform(data,img,hashtag);
		}
	});
	return endcheck;
}
//글 리스트 태그 만들기
function listform(data,img,hashtag){
	var endcheck = true;
	var str="";
	//db에서 가져온 테이블이 존재 할 경우
	if(data.length!=0){
		$.each(data,function(i,item){
			var num =item.num;
			
			str += "<div id='"+item.num+"' class='listform'>";
				
				//아이디
				str += "<div class='id'>";
					str +="<font style='text-align:left;'>"+item.nickname+"</font>"
					str +="<font style='text-align:rigth;'>"+item.writeday+"</font>"
				str += "</div>";//아이디 끝
					
				//
				str += "<div class='btnlist'>";
					str +="<button class='btn btn-primary dropdown-toggle' data-toggle='dropdown'></button>"
					//수정 삭제 버튼
					str += "<div class='dropdown-menu'>";
						str += "<form id='frm' method='post' action='updateboard.jsp'>";
							str += "<button type='submit' class='updatebtn btn btn-primary'>수정</button>";
							str += "<input type='hidden' name='num' value='"+item.num+"'>";
						str += "</form>";
						str += "<button type='button' class='delbtn btn btn-primary' num='"+item.num+"'>삭제</button>";
						
					str += "</div>";//수정 삭제 버튼 끝
				str += "</div>";
					str += imgTag(num,img);
				//내용
				str += "<div class='con'>";
					str +="<pre class='content'>"+item.content+"</pre>"
				str += "</div>";//내용 끝
					
				//좋아요, 댓글 수 
				str += "<div class='likes'>";
					str +="<img class='likey' src='../img/heart-empty.png'/><span>"+item.likes+"</span>";
					str +="<span>댓글 : "+item.reply+"</span>";
				str += "</div>";//좋아요, 댓글 수 끝
				
				//해쉬태그 
				str += "<div class='hashtags'>";
					str += hashTag(num,hashtag);
				str += "</div>";//해쉬태그 끝
				
			str += "</div>";
		});
		$("#list").append(str);
	}else{
		endcheck = false;
	}
	return endcheck;
}

//이미지 가져오기
function getImgList(minrow,maxrow){
	var imglist ="";
	$.ajax({
		type: "post", 
		url: "getimglist.jsp", 
		dataType: "json",
		data:{
			"minrow":minrow,
			"maxrow":maxrow
		},
		async: false,
		success:function(img){
			imglist = img;
		}
	});
	
	return imglist;
}

//리스트에 넣을 이미지 태그 만들기
function imgTag(num,img){
	var str = "<div class='imgs' style='width:500px; height:500px;'>";
	$.each(img,function(i,item){
		if(num==item.num){
			str+="<img src='"+item.file+"' styple='max-width:500px; max-height:500px;'>";
		}
	});
	str += "</div>";
	
	return str;
}

//해시태그 가져오기
function getHashTag(minrow,maxrow){
	var hashtag ="";
	$.ajax({
		type: "post", 
		url: "gethashtag.jsp", 
		dataType: "json",
		data:{
			"minrow":minrow,
			"maxrow":maxrow
		},
		async: false,
		success:function(hash){
			hashtag = hash;
		}
	});
	
	return hashtag;
}
function hashTag(num,hashtag){
	var str = "";
	$.each(hashtag,function(i,item){
		if(num==item.num){
			str+="<a href='#' class='hashtag'>#"+item.hashtag+"</a>";
		}
	});
	
	return str;
}