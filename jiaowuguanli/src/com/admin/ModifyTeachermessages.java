package com.admin;

import java.io.*;

import com.bean.DataByPage;
import com.sun.rowset.*;

import javax.servlet.http.*;
import javax.servlet.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import java.sql.*;

public class ModifyTeachermessages implements ServletRequestAware,
		ServletResponseAware {

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

	public String ModifyTeachermessages() throws IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);
		String back_xm = req.getParameter("XM");
		String back_xb = req.getParameter("XB");
		String back_NL = req.getParameter("NL");
		String back_zc = req.getParameter("ZC");
		String back_yx = req.getParameter("YX");
		String back_Idnumber = req.getParameter("Idnumber");
		String back_Idnumber_old = req.getParameter("Idnumber_old");
		int back_nl = 0;
		Connection con = null;
		String cdn = "";
		String cdn2 = "";
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
			cdn = "SELECT * FROM teacher";
			ResultSet rs = sql.executeQuery(cdn);
			if (back_NL != null && back_Idnumber != null
					&& back_Idnumber_old != null) {
				back_nl = Integer.parseInt(back_NL);
				cdn2 = "SELECT Idnumber FROM Id  where Idnumber='"
						+ back_Idnumber + "'";
				ResultSet rs2 = sql.executeQuery(cdn2);
				if (rs2.next()) {
					cond = "update teacher set XM='" + back_xm + "',XB='"
							+ back_xb + "',NL='" + back_nl + "',ZC='" + back_zc
							+ "',Idnumber='" + back_Idnumber + "',YX='"
							+ back_yx + "'where Idnumber='" + back_Idnumber_old
							+ "';";
					sql.executeUpdate(cond);
					cdn = "SELECT * FROM teacher";
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
					int XH = rowSet.getInt(1);
					String XM = rowSet.getString(2);
					String XB = rowSet.getString(3);
					int NL = rowSet.getInt(4);
					String ZY = rowSet.getString(5);
					String YX = rowSet.getString(6);
					String Idnumber = rowSet.getString(7);
					if (i != totalRecord) {
						out.println("{ \"0\" : \"" + XM + "\",\"1\" : \"" + XB
								+ "\",\"2\" : \"" + NL + "\" , \"3\" : \"" + ZY
								+ "\", \"4\" : \"" + YX + "\", \"5\" : \""
								+ Idnumber + "\"},");
					} else {
						out.println("{ \"0\" : \"" + XM + "\",\"1\" : \"" + XB
								+ "\",\"2\" : \"" + NL + "\" , \"3\" : \"" + ZY
								+ "\", \"4\" : \"" + YX + "\", \"5\" : \""
								+ Idnumber + "\"}");
					}

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
