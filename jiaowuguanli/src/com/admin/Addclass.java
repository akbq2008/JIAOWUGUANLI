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

public class Addclass implements ServletRequestAware, ServletResponseAware {

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

	public String Addclass() throws IOException {
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
		String KS = req.getParameter("KS");
		String kcdm = req.getParameter("KCDM");
		// System.out.println(xm + xb + nl + Idnumber);
		int kch = 0;
		Float ks;
		String cdn = "";
		String cdn2 = "";
		try {
			Connection con = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");

			Statement sql = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);

			if (KCH != null && kcm != null && KS != null && kcdm != null) {
				kch = Integer.parseInt(KCH);
				ks = Float.parseFloat(KS);
				String cdn3 = "INSERT INTO course(KCH,KCM,KS,KCDM)"
						+ "VALUES('" + kch + "','" + kcm + "','" + ks + "','"
						+ kcdm + "')";
				sql = con.createStatement();
				int rs = sql.executeUpdate(cdn3);
				if (rs > 0) {
					out.print(true);
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
