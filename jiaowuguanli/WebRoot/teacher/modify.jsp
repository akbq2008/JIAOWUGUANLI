<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

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
		<form action="/demo9/gerenchaxun" method="post">
			请输入你的身份标识<input type="text" name='identity'> <br>
			请输入新的密码<input type="password" name='password'><br>
			请输入新的密码<input type="password" name='again_password'><br>
			<input type="submit" value='提交'>
		</form>
	</div>
</body>
</html>
