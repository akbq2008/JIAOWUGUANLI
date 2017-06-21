package com.servlet;

import java.io.*;
import java.sql.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.bean.DataByPage;
import com.bean.Login;
import com.bean.Register;
import com.sun.rowset.CachedRowSetImpl;

public class Handlexuanke implements ServletRequestAware, ServletResponseAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PreparedStatement sql;

	public void init() {
		// TODO Auto-generated method stub

		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

		} catch (Exception e) {
			System.out.println("û�м��ص���");
		}

	}

	public String xuanke() throws IOException {
		// TODO Auto-generated method stub
		Login loginBean = null;
		HttpSession session = req.getSession(true);// ��ȡ�ͻ��ĻỰ����
		try {
			loginBean = (Login) session.getAttribute("loginBean");

			if (loginBean == null) {
				loginBean = new Login();// �����µ����ģ��;

				session.setAttribute("loginBean", loginBean);
				loginBean = (Login) session.getAttribute("loginBean");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		PrintWriter out = resp.getWriter();
		req.setCharacterEncoding("utf-8");// ���������ö�̬���֣�������ݿ⣩��ǰ������ҳ�澲̬����
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
			String condition = "SELECT  Idnumber FROM users where logname='"
					+ logname + "'";
			sql = con.prepareStatement(condition);
			ResultSet rs = sql.executeQuery();
			rs.next();
			String Idnumber = rs.getString("Idnumber");
			String cdn = "INSERT INTO sc(KCH,KCM,KS,KCDM,Idnumber)"
					+ "VALUES('" + kch + "','" + kcm + "','" + ks + "','"
					+ kcdm + "','" + Idnumber + "')";
			sql = con.prepareStatement(cdn);
			sql.executeUpdate();
			out.print(true);
			con.close();

		} catch (SQLException ex) {
			System.out.println(ex);
		}
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
