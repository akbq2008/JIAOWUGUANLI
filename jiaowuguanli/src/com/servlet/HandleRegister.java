package com.servlet;

import com.bean.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import java.sql.*;
import java.io.*;

public class HandleRegister implements ServletRequestAware,
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
		}

	}

	public String handleString(String s) {
		try {
			byte b[] = s.getBytes("gb2312");
			s = new String(b);
		} catch (Exception e) {
		}
		return s;
	}

	// @SuppressWarnings("unused")
	public String register() throws IOException {
		// TODO Auto-generated method stub
		init();
		req.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		resp.setCharacterEncoding("UTF-8");
		PreparedStatement sql;
		Statement sql2;
		Statement sql3;
		Statement sql4;
		ResultSet rs;
		ResultSet rs2;
		ResultSet rs3;
		Register userBean = new Register();
		String logname = req.getParameter("logname").trim();
		String password = req.getParameter("password").trim();
		String again_password = req.getParameter("again_password").trim();
		String Idnumber = req.getParameter("Idnumber").trim();
		String search = req.getParameter("search").trim();
		try {
			Connection conn = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");

			String insert = "INSERT INTO users VALUES (?,?,?)";
			String condition = "select logname from users where logname='"
					+ logname + "';";
			sql2 = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			rs = sql2.executeQuery(condition);
			String condition2 = "select Idnumber from users where Idnumber='"
					+ Idnumber + "';";
			String condition3 = "select Idnumber from Id where Idnumber='"
					+ Idnumber + "';";
			sql3 = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			rs2 = sql3.executeQuery(condition2);

			sql4 = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			rs3 = sql4.executeQuery(condition3);
			PrintWriter out = resp.getWriter();
			if (!rs3.next()) {
				out.print("no");// 不存在
			} else {
				if (rs.next() || rs2.next()) {
					Boolean user = true;
					out.print(user);
				} else if (rs.next() == false && rs2.next() == false) {
					if (logname != "" && password != "" && Idnumber != ""
							&& !search.equals("检验用户名")) {

						sql = conn.prepareStatement(insert);
						sql.setString(1, handleString(logname));
						sql.setString(2, handleString(password));
						sql.setString(3, handleString(Idnumber));
						int m = sql.executeUpdate();
					}
				}
			}
			conn.close();
		} catch (SQLException ee) {

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