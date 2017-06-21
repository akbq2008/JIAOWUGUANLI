package com.teacher;

import java.io.*;
import java.sql.*;

import javax.servlet.*;
import javax.servlet.http.*;

import com.bean.DataByPage;
import com.sun.rowset.CachedRowSetImpl;

public class Dafen extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("restriction")
	CachedRowSetImpl rowSet = null;

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);

		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

		} catch (Exception e) {
			System.out.println("没有加载到驱动");
		}
	}

	public void fail(HttpServletRequest req, HttpServletResponse resp,
			String backNews) {
		resp.setContentType("text/html;charset=gb2312");
		try {
			PrintWriter out = resp.getWriter();
			out.println("<html><body>");
			out.println("<h2>" + backNews + "</h2>");
			out.println("返回:");
			out.println("<a href='teacher/personal.jsp'>返回输入</a>");
			out.println("</html></body>");
		} catch (IOException exp) {
		}
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		req.setCharacterEncoding("utf-8");
		HttpSession session = req.getSession(true);
		/*
		 * true: 如果session存在，则返回该session，否则创建一个新的session； false:
		 * 如果session存在，则返回该session，否则返回null.
		 */
		String Id = req.getParameter("CJ");
		if (Id == null || Id.length() == 0) {
			Id = "1";
		}
		String kch = req.getParameter("KCH");

		String Idnumber = req.getParameter("Idnumber");
		Connection con = null;
		String cdn = "";
		DataByPage dataBean = null;
		try {
			dataBean = (DataByPage) session.getAttribute("dataBean");
			if (dataBean == null) {
				dataBean = new DataByPage();// 创建对象
				session.setAttribute("dataBean", dataBean);
			}
		} catch (Exception exp) {
			dataBean = new DataByPage();// 创建对象
			session.setAttribute("dataBean", dataBean);
		}

		try {
			con = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");
			Statement sql = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);// 读取classify表，获得分类

			if (Id.equals("1")) {
				resp.sendRedirect("/demo9/teacher/showchaxun.jsp");
				return;
			} else {
				cdn = "update sc set CJ='" + Id + "'where Idnumber='"
						+ Idnumber + "'and KCH='" + kch + "'";
				ResultSet rs = sql.executeQuery(cdn);
				rowSet = new CachedRowSetImpl();
				rowSet.populate(rs);// 将rs记录转载到CachedRowSetImpl对象中，然后关闭数据库连接，释放资源
				dataBean.setRowSet(rowSet);
				con.close();
			}

		} catch (SQLException ex) {
			System.out.println(ex);
		}
		resp.sendRedirect("/demo9/teacher/searchclasses.jsp");

	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
}
