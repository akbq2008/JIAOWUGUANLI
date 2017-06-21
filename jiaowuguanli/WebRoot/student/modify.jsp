<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<jsp:useBean id="loginBean" class='com.bean.Login' scope="session"></jsp:useBean>
<html>
<head>
<link rel="stylesheet" href="../css/student.css">
<link rel="stylesheet" href="../css/modify.css">
<link rel="stylesheet" href="../css/skin-content-color-class.css"
	id='cssfile'>
</head>
<body>
	<div id="main-body">
		<div id="skin">
			<div class="skin-top">
				<a href="javascript:void(0);" value='保存' class='skin-save'>保存</a> <a
					href="javascript:void(0);" value='取消' class='skin-cancel'>取消</a> <a
					href="javascript:void(0);" value='恢复默认' class='skin-recover'>恢复默认</a>
			</div>
			<div class="skin-content">
				<div class="skin-content-color">
					<a href="javascript:void(0);"
						class='skin-content-color-class checked' id='class'></a> <a
						href="javascript:void(0);" class='skin-content-color-default'
						id='default'></a> <a href="javascript:void(0);"
						class='skin-content-color-blue' id='blue'></a> <a
						href="javascript:void(0);" class='skin-content-color-red' id='red'></a>
					<a href="javascript:void(0);" class='skin-content-color-pink'
						id='pink'></a> <a href="javascript:void(0);"
						class='skin-content-color-yellow' id='yellow'></a> <a
						href="javascript:void(0);" class='skin-content-color-green'
						id='green'></a> <span class='pagenum'>1/4</span>
				</div>
				<!-- 选择普通颜色 -->
				<div class="skin-content-pic">
					<!-- 皮肤图片层-->
					<div class="skin-content-pics-container">
						<!-- 包裹层 -->
						<div class="skin-content-pics-pages">
							<!-- 页层 -->
							<div class="skin-pics-page">
								<!-- 当前页 -->
								<div class="online-pics">
									<img src="../image/preview.png" class='skin-content-color-pic1'
										id='pic1' alt="未找到"><a href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview1.jpg"
										class='skin-content-color-pic2' id='pic2' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview2.jpg"
										class='skin-content-color-pic3' id='pic3' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview3.jpg"
										class='skin-content-color-pic4' id='pic4' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview4.jpg"
										class='skin-content-color-pic5' id='pic5' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview5.jpg"
										class='skin-content-color-pic6' id='pic6' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview6.jpg"
										class='skin-content-color-pic7' id='pic7' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview7.jpg"
										class='skin-content-color-pic8' id='pic8' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview8.jpg"
										class='skin-content-color-pic9' id='pic9' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview9.jpg"
										class='skin-content-color-pic10' id='pic10' alt="未找到"><a
										href="javascript:void(0);">图片</a>
								</div>
							</div>
							<div class="skin-pics-page ">
								<!-- 当前页 -->
								<div class="online-pics">
									<img src="../image/preview10.jpg"
										class='skin-content-color-pic11' id='pic11' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview11.jpg"
										class='skin-content-color-pic12' id='pic12' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview12.jpg"
										class='skin-content-color-pic13' id='pic13' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview13.jpg"
										class='skin-content-color-pic14' id='pic14' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview14.jpg"
										class='skin-content-color-pic15' id='pic15' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview15.jpg"
										class='skin-content-color-pic16' id='pic16' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview16.jpg"
										class='skin-content-color-pic17' id='pic17' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview17.jpg"
										class='skin-content-color-pic18' id='pic18' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview18.jpg"
										class='skin-content-color-pic19' id='pic19' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview19.jpg"
										class='skin-content-color-pic20' id='pic20' alt="未找到"><a
										href="javascript:void(0);">图片2</a>
								</div>
							</div>
							<div class="skin-pics-page ">
								<!-- 当前页 -->
								<div class="online-pics">
									<img src="../image/preview20.jpg"
										class='skin-content-color-pic21' id='pic21' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview21.jpg"
										class='skin-content-color-pic22' id='pic22' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview22.jpg"
										class='skin-content-color-pic23' id='pic23' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview23.jpg"
										class='skin-content-color-pic24' id='pic24' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview24.jpg"
										class='skin-content-color-pic25' id='pic25' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview25.jpg"
										class='skin-content-color-pic26' id='pic26' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview26.jpg"
										class='skin-content-color-pic27' id='pic27' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview27.jpg"
										class='skin-content-color-pic28' id='pic28' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview28.jpg"
										class='skin-content-color-pic29' id='pic29' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview29.jpg"
										class='skin-content-color-pic30' id='pic30' alt="未找到"><a
										href="javascript:void(0);">图片3</a>
								</div>
							</div>
							<div class="skin-pics-page ">
								<!-- 当前页 -->
								<div class="online-pics">
									<img src="../image/preview30.jpg"
										class='skin-content-color-pic31' id='pic31' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview31.jpg"
										class='skin-content-color-pic32' id='pic32' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview32.jpg"
										class='skin-content-color-pic33' id='pic33' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview33.jpg"
										class='skin-content-color-pic34' id='pic34' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview34.jpg"
										class='skin-content-color-pic35' id='pic35' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview35.jpg"
										class='skin-content-color-pic36' id='pic36' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview36.jpg"
										class='skin-content-color-pic37' id='pic37' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview37.jpg"
										class='skin-content-color-pic38' id='pic38' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview38.jpg"
										class='skin-content-color-pic39' id='pic39' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
								<div class="online-pics">
									<img src="../image/preview39.jpg"
										class='skin-content-color-pic40' id='pic40' alt="未找到"><a
										href="javascript:void(0);">图片4</a>
								</div>
							</div>
							<!-- 当前页 -->
						</div>
						<!-- 页层 -->
					</div>
					<!-- 包裹层 -->
					<a href="javascript:void(0);" class="prev"></a> <a
						href="javascript:void(0);" class="next"></a>
				</div>
				<!-- 皮肤图片层-->
			</div>
			<!-- 皮肤选择层 -->
		</div>
		<!-- 皮肤层 -->
		<div id="top">
			<div class='top-list'>
				<ul>
					<li><i class='main-page top-pic'></i><span class='txt'><a
							href='javascript:void(0);' class='student'>学生主页面</a> </span></li>
					<li><i class='select-classes top-pic'></i><span class='txt'><a
							href='javascript:void(0);' class='searchclasses'>在线选课</a> </span></li>
					<li><i class='select-personal-informations top-pic'></i><span
						class='txt'><a href='javascript:void(0);' class='personnal'>个人信息查询</a>
					</span></li>
					<li class='selected'><i class='modift-secreates top-pic'></i><span
						class='txt'><a href='javascript:void(0);' class='modify'>密码修改</a>
					</span></li>
				</ul>
			</div>
			<!-- 大标题跳转 -->
			<div>
				<span class='top-userpic'>
					<ul class='subNav'>
						<li><a href="searchclasses.jsp">在线选课</a></li>
						<li><a href="searchclasses.jsp">个人信息查询</a></li>
						<li><a href="modify.jsp">密码修改 </li>
						<li><i class='exit-users'></i><a href='/demo9/Handleexit'>退出</a>
						</li>
					</ul>
				</span>
				<!-- 头像 ，滑动头像，出标签-->
				<ul class='Nav'>
					<span class='top-user'> <a href="javascript:void(0);"
						class='top-username'> <jsp:getProperty property="backNews"
								name="loginBean" />
					</a>
					</span>
					<!-- 用户信息 -->
				</ul>
			</div>
			<!-- 头像跳转 -->
			<div class="top-useroption">
				<span><p class='changeskins'>换肤</p> </span>
			</div>
			<div class="top-weather-time">
				<span id="sj" style="display: block"> </span> <span id="weather"
					style="display: block"> </span> <span class='move-box'>
					<form action="" method='post' id='form' autocomplete="off">
						<input id="txt" name="text" type="text"> <input
							type="submit" value="确定" id='submit'> <input
							type="button" value="取消" id='close'>
					</form>
				</span> <span><i class='weather-arrow down'></i> </span>
			</div>
			<!-- <div class="top-useroption"> -->
			<!-- <span><a href="javascript:;" class='setmainpage'>设为首页</a> </span> -->

			<!-- </div> -->
		</div>
		<div id="main">
			<div id="main-box">
				<form action="/Handlemodify" method="post" id="form2">
					<dl>
						<dt>身份标识</dt>
						<dd>
							<input type="text" name='identity' id="identity">
						</dd>
					</dl>
					<dl>
						<dt>新的密码</dt>
						<dd>
							<input type="password" name='password'class="password" id="password">
						</dd>
					</dl>
					<dl>
						<dt>确认密码</dt>
						<dd>
							<input type="password" name='again_password' id="again_password">
						</dd>
					</dl>
					<dl>
						<dt>验证码</dt>
						<dd class="validate">
							<input type="text" name='validation' id="validation">
						</dd>
					</dl>
					<span id="v_container"></span> <input type="submit" value="提交"
						id="btn">
				</form>
			</div>
			<div class="info"></div>
		</div>
		<div id="foot_title">
			<address>版权所有:河南城建学院二区#二号楼535宿舍</address>
			<a href="mailto:673161921@qq.com">邮箱地址:673161921@qq.com</a> <a
				href="javascript:; " class='foot_a'>联系电话:18236615057</a> <a
				href="http://www.cnblogs.com/yi-mi-yangguang/">博客:一米阳光!</a>
		</div>
	</div>
	<script src="../js/jquery.js"></script>
	<script src="../js/gVerify.js" charset="utf-8"></script>
	<script src="../js/jquery.validate.js" charset="utf-8"></script>
	<script src="../js/modify.js" charset="utf-8"></script>
	<script src="../js/userskins.js" charset="utf-8"></script>
	<script src="../js/jquery.cookie.js" charset="utf-8"></script>
	<script src="../js/student-move.js" charset="gb2312"></script>
</body>
</html>