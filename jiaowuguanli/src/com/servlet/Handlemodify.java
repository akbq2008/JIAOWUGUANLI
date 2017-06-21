package com.servlet;

import java.io.*;
import java.sql.*;

import javax.servlet.http.*;
import javax.servlet.*;
import javax.swing.JOptionPane;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.bean.DataByPage;
import com.sun.rowset.CachedRowSetImpl;

public class Handlemodify implements ServletRequestAware, ServletResponseAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("restriction")
	CachedRowSetImpl rowSet = null;

	public void init() {
		// TODO Auto-generated method stub

		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

		} catch (Exception e) {
			System.out.println("没有加载到驱动");
		}
	}

	public String modify() throws IOException {
		// TODO Auto-generated method stub
		init();
		req.setCharacterEncoding("gb2312");
		HttpSession session = req.getSession(true);
		String Id = req.getParameter("identity");
		String password = req.getParameter("password").trim();
		String again_password = req.getParameter("again_password").trim();
		Connection con = null;
		String cdn = "", condition = "";
		Statement sql2;
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
			Statement sql = con.createStatement(
					ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			cdn = "update users set password='" + password + "'"
					+ "where Idnumber='" + Id + "'";
			condition = "SELECT  Idnumber FROM users where Idnumber='" + Id
					+ "'";
			sql2 = con.createStatement();
			ResultSet rs2 = sql2.executeQuery(condition);
			PrintWriter out = resp.getWriter();
			boolean message;
			message = rs2.next();
			int rs = sql.executeUpdate(cdn); // 这里不能为executeQuery
												// 之前因为这里出错了，所以没法继续向下执行
			if (message) {
				out.print(true);
			} else {
				out.print(false);
			}
			con.close();

		} catch (SQLException ex) {
			System.out.println(ex);
		}
		return null;
	}

	private HttpServletResponse resp;

	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		resp = arg0;
	}

	private HttpServletRequest req;

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		req = arg0;
	}
}
