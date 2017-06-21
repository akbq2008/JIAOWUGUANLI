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

.xuanke form {
	width: 100%;
	overflow: hidden;
	text-align: center;
}

#main {
	overflow: hidden;
	width: 100%;
	text-align: center;
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
		<form action="/demo9/Jiaoxueplan" method="post">
			请输入您的教师号<input type='text' name='JSH'> <input type="submit"
				name='b' value='提交'>


		</form>
	</div>
</body>
</html>
