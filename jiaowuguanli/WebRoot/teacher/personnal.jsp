<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<jsp:useBean id="register" class='com.bean.Register' scope="session"></jsp:useBean>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<style type="text/css">
* {
	margin: 0;
	padding: 0;
}

ul {
	list-style: none;
}

.title {
	background-color: #ccc;
}

.title ul li {
	float: left;
	margin: 20px 50px;
}

.title ul li a {
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

#main {
	height: 407px;
	width: 100%;
	overflow: hidden;
	text-align: center;
}

#main .form1 {
	margin-bottom: 40px;
}

#foot {
	background-color: #ccc;
}
</style>

</head>

<body background="../image/ic_background.jpg">
	<div class='title'>
		<ul>
			<li><a href='teacher.jsp'>教师主页面</a></li>
			<li><a href='plan.jsp'>教学实施计划查询</a></li>
			<li><a href='searchclasses.jsp'>选课信息查询打分</a></li>
			<li><a href='personnal.jsp'>个人信息查询</a></li>
			<li><a href='modify.jsp'>密码修改</a></li>
			<li><a href='/demo9/Handleexit'>退出用户</a></li>
		</ul>
	</div>
	<div id='main'>
		<div class='form1'>
			<form action="/demo9/gerenxinxi" method="post">
				点击下面开始查询个人信息 <br>请输入身份标识<input type="text" name='message'>
				<input type='submit' name='g' value='提交'>
			</form>
		</div>

	</div>

</body>
</html>
