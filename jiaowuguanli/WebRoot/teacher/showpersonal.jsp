<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.sun.rowset.*"%>
<%@page import="com.bean.DataByPage"%>
<jsp:useBean id="dataBean" class="com.bean.DataByPage" scope="session"></jsp:useBean>
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
	<div align="center" id='main'>

		当前显示的内容是:

		<table border="2" width="1200px">
			<tr>
				<th>教师号</th>
				<th>姓名</th>
				<th>性别</th>
				<th>年龄</th>
				<th>职称</th>
				<th>院系</th>
				<th>身份标识</th>
			</tr>

			<jsp:setProperty name="dataBean" property="pageSize" param="pageSize" />
			<jsp:setProperty name="dataBean" property="currentPage"
				param="currentPage" />

			<%
				CachedRowSetImpl rowSet = dataBean.getRowSet();
				if (rowSet == null) {
					out.print("没有任何查询信息,无法浏览");
					return;
				}
				rowSet.last();//光标移动到最后一条记录 	
				int totalRecord = rowSet.getRow();
				out.println("全部记录数" + totalRecord);//全部记录数
				int pageSize = 5;//每页显示的记录数
				int totalPages = dataBean.getTotalPages();
				if (totalRecord % pageSize == 0)
					totalPages = totalRecord / pageSize;//总页数
				else
					totalPages = totalRecord / pageSize + 1;
				dataBean.setPageSize(pageSize);
				dataBean.setTotalPages(totalPages);
				if (totalPages >= 1) {
					if (dataBean.getCurrentPage() < 1)
						dataBean.setCurrentPage(dataBean.getTotalPages());
					if (dataBean.getCurrentPage() > dataBean.getTotalPages())
						dataBean.setCurrentPage(1);
					int index = (dataBean.getCurrentPage() - 1) * pageSize + 1;
					rowSet.absolute(index);//查询位置移动到currentPage页起始位置
					boolean boo = true;
					for (int i = 1; i <= pageSize && boo; i++) {
						int jsh = rowSet.getInt(1);
						String xm = rowSet.getString(2);
						String xb = rowSet.getString(3);
						int nl = rowSet.getInt(4);
						String zc = rowSet.getString(5);
						String yx = rowSet.getString(6);
						String Idnumber = rowSet.getString(7);

						/*String button = "<form action='/demo9/Handlexuanke' method='post'>"
								+ "<input type='hidden' name='java' value="
								+ xk
								+ ">"
								+ "<input type='submit' name='g' value='选课'>"
								+ "</form>";*/
						out.print("<center>" + "<tr>");
						out.print("<td>" + jsh + "</td>");
						out.print("<td>" + xm + "</td>");
						out.print("<td>" + xb + "</td>");
						out.print("<td>" + nl + "</td>");
						out.print("<td>" + zc + "</td>");
						out.print("<td>" + yx + "</td>");
						out.print("<td>" + Idnumber + "</td>");
						out.print("</tr>" + "</center>");
						boo = rowSet.next();

					}
				}
			%>

		</table>
	</div>
	<div align="center" id='foot'>
		<br>每页最多显示<jsp:getProperty property="pageSize" name="dataBean" />条信息
		<br>当前显示第 <font color=blue> <jsp:getProperty
				property="currentPage" name="dataBean" /> 页，共有<jsp:getProperty
				property="totalPages" name="dataBean" /></font>页。
		<table>
			<tr>
				<td><form action="" method="post">
						<input type="hidden" name="currentPage"
							value="<%=dataBean.getCurrentPage() - 1%>"> <input
							type="submit" name="g" value="上一页">
					</form></td>
				<td><form action="" method="post">
						<input type="hidden" name="currentPage"
							value="<%=dataBean.getCurrentPage() + 1%>"> <input
							type="submit" name="g" value="下一页">
					</form></td>
			</tr>

			<tr>


				<td><form action="" method="post">
						输入页码<input type="text" name="currentPage" size=2> <input
							type="submit" name="g" value="提交">
					</form></td>
			</tr>

		</table>

	</div>
</body>
</html>
