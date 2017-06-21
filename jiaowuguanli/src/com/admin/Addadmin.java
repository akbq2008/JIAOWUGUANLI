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

public class Addadmin implements ServletRequestAware, ServletResponseAware {

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

	public String Addadmin() throws IOException {
		// TODO Auto-generated method stub
		init();
		Login loginBean = null;
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);// 获取客户的会话对象
		PrintWriter out = resp.getWriter();
		String xm = req.getParameter("XM");
		String xb = req.getParameter("XB");
		String nl = req.getParameter("NL");
		String Idnumber = req.getParameter("Idnumber");
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
			cdn = "SELECT Idnumber FROM Id  where Idnumber='" + Idnumber + "'";
			ResultSet rs = sql.executeQuery(cdn);

			if (!rs.next()) {// Id中不存在Idnumber
				if (xm != null && xb != null && nl != null) {

					String cdn3 = "INSERT INTO Id(XM,XB,NL,Idnumber)"
							+ "VALUES('" + xm + "','" + xb + "','" + nl + "','"
							+ Idnumber + "')";
					sql = con.createStatement();
					sql.executeUpdate(cdn3);

					String cdn4 = "INSERT INTO admini(XM,XB,NL,Idnumber)"
							+ "VALUES('" + xm + "','" + xb + "','" + nl + "','"
							+ Idnumber + "')";
					sql = con.createStatement();
					sql.executeUpdate(cdn4);
					out.print(true);

				}
			} else {
				cdn2 = "select Idnumber from admini where Idnumber='"
						+ Idnumber + "'";
				ResultSet rs2 = sql2.executeQuery(cdn2);
				if (rs2.next()) {
					out.print(false);
				} else {
					if (xm != null && xb != null && nl != null) {
						String cdn5 = "INSERT INTO admini(XM,XB,NL,Idnumber)"
								+ "VALUES('" + xm + "','" + xb + "','" + nl
								+ "','" + Idnumber + "')";
						sql = con.createStatement();
						sql.executeUpdate(cdn5);
						out.print(true);

					}
				}

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
		resp = arg0;
	}

	private HttpServletRequest req;

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		req = arg0;
	}

}
