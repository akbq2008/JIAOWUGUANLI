package com.admin;

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

public class Addplan implements ServletRequestAware, ServletResponseAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PreparedStatement sql;
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

	public String Addplan() throws IOException {
		// TODO Auto-generated method stub
		init();
		Login loginBean = null;
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);// 获取客户的会话对象
		PrintWriter out = resp.getWriter();
		String KCH = req.getParameter("KCH");
		String kcm = req.getParameter("KCM");
		String JSH = req.getParameter("JSH");
		String xm = req.getParameter("XM");
		String skdd = req.getParameter("SKDD");
		String sksj = req.getParameter("SKSJ");
		String skbj = req.getParameter("SKBJ");
		int kch = 0;
		int jsh = 0;
		String cdn = "";
		String cdn2 = "";
		try {
			Connection con = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");

			Statement sql = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);
			Statement sql2 = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);
			if (KCH != null && JSH != null) {
				kch = Integer.parseInt(KCH);
				jsh = Integer.parseInt(JSH);
				cdn = "SELECT KCH,KCM FROM course  where KCH='" + kch + "'";
				ResultSet rs = sql.executeQuery(cdn);
				cdn2 = "SELECT JSH,XM FROM teacher  where JSH='" + jsh + "'";
				ResultSet rs2 = sql2.executeQuery(cdn);
				if (rs.next() && rs2.next()) {
					String cdn3 = "INSERT INTO tc(JSH,KCM,KCH,XM,SKDD,SKSJ,SKBJ)"
							+ "VALUES('"+ jsh + "','" + kcm + "','" + kch + "','" + xm + "','" + skdd
							+ "','" + sksj + "','" + skbj + "')";
					sql2 = con.createStatement();
					int rs3 = sql2.executeUpdate(cdn3);
					if (rs3 > 0) {
						out.print(true);
					}

				} else if (!rs.next()) {
					out.print("kch_false");
				} else {
					out.print("jsh_false");
				}
			}
			con.close();

		} catch (SQLException ex) {
			System.out.println(ex);
			out.print(false);

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
