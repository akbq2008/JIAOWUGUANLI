package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.bean.Login;

public class Handlelogin implements ServletRequestAware, ServletResponseAware {

	public void init() {
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

		} catch (Exception e) {

		}

	}

	public String handleString(String s) {
		try {
			byte b[] = s.getBytes("gb2312");
			s = new String(b);
		} catch (Exception ee) {
		}
		return s;
	}

	public String login() throws IOException {

		init();

		Connection con;
		Statement sql;
		ResultSet rs;
		// try {
		req.setCharacterEncoding("utf-8");
		String logname = req.getParameter("logname").trim(), // trim函数用于删除文本的空格
		password = req.getParameter("password").trim(), 
		Idnumber = req.getParameter("Idnumber").trim();
		logname = handleString(logname);
		password = handleString(password);
		Idnumber = handleString(Idnumber);

		try {
			Connection conn = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");
			String condition = "select * from users where logname='" + logname
					+ "' and     password='" + password
					+ "' and     Idnumber='" + Idnumber + "';";
			sql = conn.createStatement();

			rs = sql.executeQuery(condition);
			boolean m = rs.next();
			if (m == true) {
				String num = req.getParameter("Idnumber");
				String nu = num.substring(0, 2);
				String type = req.getParameter("people");
				if ((type.equals("teacher")) && (nu.equals("01"))
						|| (type.equals("teacher")) && (nu.equals("00"))) {
					success(req, resp, logname, password, Idnumber);
					return "teacher";
				} else if ((type.equals("admin")) && (nu.equals("00"))) {
					success(req, resp, logname, password, Idnumber);
					return "admin";
				} else {
					success(req, resp, logname, password, Idnumber);
					return "student";
				}

			} else {
				String backNews = "你输入的信息不匹配";
				// 调用失败的方法
				fail(req, resp, logname, backNews);
			}

			conn.close();
		} catch (SQLException exp) {
			String backNews = "" + exp;
			fail(req, resp, logname, backNews);

		}
		return null;

	}

	public void success(HttpServletRequest req, HttpServletResponse resp,
			String logname, String password, String Idnumber) {
		Login loginBean = null;
		HttpSession session = req.getSession(true);// 获取客户的会话对象
		try {
			loginBean = (Login) session.getAttribute("loginBean");

			if (loginBean == null) {
				loginBean = new Login();// 创建新的数据模型;

				session.setAttribute("loginBean", loginBean);
				loginBean = (Login) session.getAttribute("loginBean");

			}
			String name = loginBean.getLogname();
			if (name.equals(logname)) {
				loginBean.setBackNews(logname);

				loginBean.setLogname(logname);

			} else {// 数据模型存储新的登入用户
				loginBean.setBackNews(logname);//
				loginBean.setLogname(logname);

			}

		} catch (Exception e) {
			loginBean = new Login();
			session.setAttribute("loginBean", loginBean);
			loginBean.setBackNews(logname);
			loginBean.setLogname(logname);

		}

	}

	public void fail(HttpServletRequest req, HttpServletResponse resp,
			String logname, String backNews) {
		// TODO Auto-generated method stub
		resp.setContentType("text/html;charset=gb2312");
		try {
			PrintWriter out = resp.getWriter();// 输出流
			out.println("<html><body>");
			out.print("你的登入用户名" + logname + "<br>" + backNews + "<br>");
			out.print("<a href='login.html'>返回登录页面</a>");
			out.println("</body></html>");

		} catch (IOException exp) {
		}

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
