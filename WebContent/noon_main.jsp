<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="main_css/reset.css" media="screen" />
<link rel="stylesheet" href="main_css/style.css" media="screen" />
<link rel="stylesheet" href="main_css/css3_3d.css" media="screen" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script type="text/javascript" src="main_js/mxodernizr.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="main_js/jquery.tubular.1.0.js"></script>
<link href="https://fonts.googleapis.com/css?family=Montserrat+Subrayada&display=swap" rel="stylesheet">
<meta charset="UTF-8">
<style>
#wrapper{
width:100%;

}
.login_main{
width:750px;
height:600px; 
background-color:rgba(255,255,255,0.7);
margin:0 auto;
margin-top:150px; 
text-align: center;
}

.main_input{
	width:330px;
	height:50px;
	border:1px solid gray;
	border-radius: 30px;
	text-align: center;
	line-height: 5;
	margin-top:20px;

}

.main_simbol{
	font-family: 'Montserrat Subrayada', sans-serif;
	text-align: center;
	font-size:80pt;
	padding-top:20px;
	height:200px;
	line-height: unset;
}
.main_submit{
	width:330px;
	height:50px;
	background:skyblue;
	border:none;
	border-radius:10px;
	margin-top:20px;
}
.main_serc{
	width:330px;
	text-align:left;
	margin:0 auto;
	margin-top:10px;
}

.check_id{
	margin:0 auto;
	margin-top:10px;
	width:330px;
	text-align: left;
}
</style>
<script type="text/javascript">
$(function(){
	var options={
			videoId:'Wimkqo8gDZ0',
			start:2
	}
	
	
	$("#wrapper").tubular(options);
});
</script>
<titlea>메인 로그인 페이지</title>
</head>
<body>
<div id="wrapper">
	<div class="container">
		<div class="row">
		  <div class="col-md-12 col-sm-12 col-xs-12">
		  	<div class="login_main">
		  	<p class="main_simbol">NOON</p>
		  	<input class="main_input" type="text" placeholder="아이디"><br>
			<input class="main_input" type="text" placeholder="비밀번호"><br>
			<input class="main_submit" type="submit" value="로그인"><br>
			
			<p class="main_serc"><a href="#"style="margin-left:10px;">회원가입</a><a href="#" style="float:right;">아이디/비밀번호 찾기</a></p>
			<p class="check_id"><input type="checkbox" id="idcheck" name="idcheck" style="width:20px;height:20px;"> 아이디 저장</p>
			</div>
		  </div>
		</div>
	</div>
</div>
</body>
</html>