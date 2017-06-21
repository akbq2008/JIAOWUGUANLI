package com.admin;

import java.io.*;

import com.bean.DataByPage;
import com.sun.rowset.*;

import javax.servlet.http.*;
import javax.servlet.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import java.sql.*;

public class Modifyplan implements ServletRequestAware, ServletResponseAware {

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

	public String Modifyplan() throws IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);
		String back_JSH = req.getParameter("JSH");
		String back_kcm = req.getParameter("KCM");
		String back_KCH = req.getParameter("KCH");
		String back_xm = req.getParameter("XM");
		String back_skdd = req.getParameter("SKDD");
		String back_sksj = req.getParameter("SKSJ");
		String back_skbj = req.getParameter("SKBJ");
		String back_JSH_old = req.getParameter("JSH_old");
		String back_KCH_old = req.getParameter("KCH_old");
		int back_jsh = 0;
		int back_kch = 0;
		int back_jsh_old = 0;
		int back_kch_old = 0;
		Connection con = null;
		String cdn = "";
		String cdn2 = "";
		String cdn3 = "";
		String cond = "";
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
							ResultSet.CONCUR_READ_ONLY);
			Statement sql2 = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);// 可以解决结果集关闭
			cdn = "SELECT * FROM tc";
			ResultSet rs = sql.executeQuery(cdn);
			if (back_JSH != null && back_KCH != null) {
				back_jsh = Integer.parseInt(back_JSH);
				back_kch = Integer.parseInt(back_KCH);
				back_jsh_old = Integer.parseInt(back_JSH_old);
				back_kch_old = Integer.parseInt(back_KCH_old);
				cdn2 = "SELECT JSH FROM teacher  where JSH='" + back_jsh + "'";
				ResultSet rs2 = sql.executeQuery(cdn2);
				cdn3 = "SELECT KCH FROM course  where KCH='" + back_kch + "'";
				ResultSet rs3 = sql2.executeQuery(cdn3);
				if (rs2.next() && rs3.next()) {
					cond = "update tc set JSH='" + back_jsh + "',KCM='"
							+ back_kcm + "',KCH='" + back_kch + "',XM='"
							+ back_xm + "',SKDD='" + back_skdd + "',SKSJ='"
							+ back_sksj + "',SKBJ='" + back_skbj
							+ "'where JSH='" + back_jsh_old + "' and KCH='"
							+ back_kch_old + "'";
					sql.executeUpdate(cond);
					cdn = "SELECT * FROM tc";
					rs = sql.executeQuery(cdn);
				} else {
					Boolean flag = false;
					PrintWriter out = resp.getWriter();
					out.print(flag);
					System.out.println(flag);
				}
			}
			rowSet = new CachedRowSetImpl();// 创建行集对象
			rowSet.populate(rs);
			dataBean.setRowSet(rowSet);
			PrintWriter out = resp.getWriter();
			CachedRowSetImpl rowSet = dataBean.getRowSet();
			if (rowSet == null) {
				out.print("没有任何查询信息,无法浏览");
				return null;
			}
			rowSet.last();// 光标移动到最后一条记录
			int totalRecord = rowSet.getRow();
			int pageSize = 5;// 每页显示的记录数
			int lineRecord = 7;
			int totalPages = dataBean.getTotalPages();//
			if (totalRecord % pageSize == 0)
				totalPages = totalRecord / pageSize;// 总页数
			else
				totalPages = totalRecord / pageSize + 1;
			dataBean.setPageSize(pageSize);
			dataBean.setTotalPages(totalPages);
			if (totalPages >= 1) {
				int index = 1;
				rowSet.absolute(index);// 查询位置移动到currentPage页起始位置
				out.print("[{\"biaoti\":[");
				out.print("{\"lineRecord\" : \"" + lineRecord
						+ "\",\"totalRecord\" : \"" + totalRecord
						+ "\",\"index\" : \"" + index
						+ "\", \"totalPages\" : \"" + totalPages
						+ "\", \"pageSize\" : \"" + pageSize + "\"}");
				out.print("],");
				out.print("\"neirong\":[");
				Boolean flag = true;
				for (int i = 1; i <= totalRecord && flag == true; i++) {
					int JSH = rowSet.getInt(1);
					String KCM = rowSet.getString(2);
					int KCH = rowSet.getInt(3);
					String XM = rowSet.getString(4);
					String SKDD = rowSet.getString(5);
					String SKSJ = rowSet.getString(6);
					String SKBJ = rowSet.getString(7);

					if (i != totalRecord) {
						out.println("{\"0\" : \"" + JSH + "\" ,\"1\" : \""
								+ KCM + "\",\"2\" : \"" + KCH
								+ "\" ,\"3\" : \"" + XM + "\",\"4\" : \""
								+ SKDD + "\",\"5\" : \"" + SKSJ
								+ "\",\"6\" : \"" + SKBJ + "\"},");
					} else {
						out.println("{\"0\" : \"" + JSH + "\" ,\"1\" : \""
								+ KCM + "\",\"2\" : \"" + KCH
								+ "\" ,\"3\" : \"" + XM + "\",\"4\" : \""
								+ SKDD + "\",\"5\" : \"" + SKSJ
								+ "\",\"6\" : \"" + SKBJ + "\"}");
					}
					// 这里出现了小问题，i的最后一个判断之前没搞清
					flag = rowSet.next();
				}
				out.print("]}]");
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
