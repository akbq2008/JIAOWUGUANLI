<%@ page language="java" import="java.util.*" pageEncoding="gb2312"%>
<%@page import="com.sun.rowset.*"%>
<%@page import="com.bean.DataByPage"%>
<jsp:useBean id="dataBean" class="com.bean.DataByPage" scope="session"></jsp:useBean>
<jsp:useBean id="loginBean" class="com.bean.Login" scope="session"></jsp:useBean>
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
	margin: 20px;
}

.title ul li a {
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

#main {
	height: 407px;
}

#foot {
	background-color: #ccc;
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
			<li><a href='teacher.jsp'>��ʦ��ҳ��</a></li>
			<li><a href='plan.jsp'>��ѧʵʩ�ƻ���ѯ</a></li>
			<li><a href='searchclasses.jsp'>ѡ����Ϣ��ѯ���</a></li>
				<li><a href='personnal.jsp'>������Ϣ��ѯ</a></li>
			<li><a href='modify.jsp'>�����޸�</a></li>
			<li><a href='/demo9/Handleexit'>�˳��û�</a></li>
		</ul>
	</div>
	<div id='main'>
		<center>
			��ǰ��ʾ��������:

			<table border="2" width="1200px">
				<tr>
					<th>�γ̺�</th>
					<th>�γ���</th>
					<th>�ɼ�</th>
					<th>��ݱ�ʶ</th>


				</tr>
				<jsp:setProperty name="loginBean" property="logname" />
				<jsp:setProperty name="dataBean" property="pageSize"
					param="pageSize" />
				<jsp:setProperty name="dataBean" property="currentPage"
					param="currentPage" />

				<%
					String logname = loginBean.getLogname();
					CachedRowSetImpl rowSet = dataBean.getRowSet();
					if (rowSet == null) {
						out.print("û���κβ�ѯ��Ϣ,�޷����");
						return;
					}
					rowSet.last();//����ƶ������һ����¼ 	
					int totalRecord = rowSet.getRow();
					out.println("ȫ����¼��" + totalRecord);//ȫ����¼��
					int pageSize = 5;//ÿҳ��ʾ�ļ�¼��
					int totalPages = dataBean.getTotalPages();
					if (totalRecord % pageSize == 0)
						totalPages = totalRecord / pageSize;//��ҳ��
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
						rowSet.absolute(index);//��ѯλ���ƶ���currentPageҳ��ʼλ��
						boolean boo = true;
						for (int i = 1; i <= pageSize && boo; i++) {
							int xh = rowSet.getInt(1);
							int kch = rowSet.getInt(2);
							String kcm = rowSet.getString(3);
							String Idnumber = rowSet.getString(5);
							String button = "<form action='/demo9/Dafen' method='post'>"
									+ "<input type='text' name='CJ'>"
									+ "<input type='hidden' name='KCH' value="
									+ kch
									+ ">"
									+ "<input type='hidden' name='Idnumber' value="
									+ Idnumber
									+ ">"
									+ "<input type='submit' name='g' value='�ύ'>"
									+ "</form>";
							out.print("<center>" + "<tr>");
							out.print("<td>" + kch + "</td>");
							out.print("<td>" + kcm + "</td>");
							out.print("<td>" + button + "</td>");
							out.print("<td>" + Idnumber + "</td>");
							out.print("</tr>" + "</center>");
							boo = rowSet.next();

						}
					}
				%>
			</table>
	</div>
	<div id='foot' align="center">
		<br>ÿҳ�����ʾ<jsp:getProperty property="pageSize" name="dataBean" />����Ϣ
		<br>��ǰ��ʾ�� <font color=blue> <jsp:getProperty
				property="currentPage" name="dataBean" /> ҳ������<jsp:getProperty
				property="totalPages" name="dataBean" /></font>ҳ��
		<table>
			<tr>
				<td><form action="" method="post">
						<input type="hidden" name="currentPage"
							value="<%=dataBean.getCurrentPage() - 1%>"> <input
							type="submit" name="g" value="��һҳ">
					</form></td>
				<td><form action="" method="post">
						<input type="hidden" name="currentPage"
							value="<%=dataBean.getCurrentPage() + 1%>"> <input
							type="submit" name="g" value="��һҳ">
					</form></td>
			</tr>

			<tr>


				<td><form action="" method="post">
						����ҳ��<input type="text" name="currentPage" size=2> <input
							type="submit" name="g" value="�ύ">
					</form></td>
			</tr>

		</table>
	</div>
</body>
</html>