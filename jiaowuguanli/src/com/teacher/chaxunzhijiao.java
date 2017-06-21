package com.teacher;

import java.io.*;

import com.bean.DataByPage;
import com.sun.rowset.*;

import javax.servlet.http.*;
import javax.servlet.*;

import java.sql.*;

public class chaxunzhijiao extends HttpServlet {

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

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		req.setCharacterEncoding("gb2312");
		HttpSession session = req.getSession(true);
		/*
		 * true: 如果session存在，则返回该session，否则创建一个新的session； false:
		 * 如果session存在，则返回该session，否则返回null.
		 */

		String mess = req.getParameter("KCM").trim();
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
			// cdn = "SELECT * FROM teacher WHERE Idnumber='" + message + "'";

			cdn = "SELECT * FROM sc WHERE KCH='" + mess + "'";
			ResultSet rs = sql.executeQuery(cdn);
			rowSet = new CachedRowSetImpl();
			rowSet.populate(rs);// 将rs记录转载到CachedRowSetImpl对象中，然后关闭数据库连接，释放资源
			dataBean.setRowSet(rowSet);
			con.close();
		} catch (SQLException ex) {
			System.out.println(ex);
		}
		resp.sendRedirect("/demo9/teacher/showchaxun.jsp");

	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
}
