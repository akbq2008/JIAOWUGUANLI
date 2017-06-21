package com.servlet;

import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.bean.Login;

public class Handlexuankedel implements ServletRequestAware,
		ServletResponseAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void init() {
		// TODO Auto-generated method stub

		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

		} catch (Exception e) {
			System.out.println("没有加载到驱动");
		}

	}

	public String Handlexuankedel() throws IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("utf-8");
		Login loginBean = null;
		HttpSession session = req.getSession(true);// 获取客户的会话对象
		try {
			loginBean = (Login) session.getAttribute("loginBean");

			if (loginBean == null) {
				loginBean = new Login();// 创建新的数据模型;

				session.setAttribute("loginBean", loginBean);
				loginBean = (Login) session.getAttribute("loginBean");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		PrintWriter out = resp.getWriter();
		String kch = req.getParameter("kch");
		String kcm = req.getParameter("kcm");
		String ks = req.getParameter("ks");
		String kcdm = req.getParameter("kcdm");
		String logname = loginBean.getLogname();
		

		try {
			Connection con = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");
			PreparedStatement sql = null;
			String cdn = "DELETE FROM sc where KCH='" + kch + "'and KCM='"
					+ kcm + "';";
			sql = con.prepareStatement(cdn);
			int num = sql.executeUpdate();
			if (num == 1) {
				out.print(true);
			} else {
				out.print(false);
			}
			con.close();

		} catch (SQLException ex) {
			System.out.println(ex);
		}
		// resp.sendRedirect("/demo9/student/xuankesuccess.jsp");
		return null;
	}

	private HttpServletResponse resp;

	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		resp = arg0;
	}

	private HttpServletRequest req;

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		req = arg0;
	}

}
