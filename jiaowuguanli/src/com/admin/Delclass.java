package com.admin;

import java.io.*;

import com.bean.DataByPage;
import com.sun.rowset.*;

import javax.servlet.http.*;
import javax.servlet.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import java.sql.*;

public class Delclass implements ServletRequestAware, ServletResponseAware {

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

	public String Delclass() throws IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);
		String kcdm = req.getParameter("KCDM");
		PrintWriter out = resp.getWriter();
		Connection con = null;
		String cdn = "";
		String cdn2 = "";
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
							ResultSet.CONCUR_READ_ONLY);
			cdn = "SELECT * FROM course";
			ResultSet rs = sql.executeQuery(cdn);
			cdn2 = "delete from course where KCDM='" + kcdm + "'";
			int rs2 = sql2.executeUpdate(cdn2);
			if (rs2 > 0) {
				out.print(true);
			}
			rowSet = new CachedRowSetImpl();
			rowSet.populate(rs);// 将rs记录转载到CachedRowSetImpl对象中，然后关闭数据库连接，释放资源
			dataBean.setRowSet(rowSet);
		
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
					int KCH = rowSet.getInt(1);
					String KCM = rowSet.getString(2);
					Float KS = rowSet.getFloat(3);
					String KCDM = rowSet.getString(4);

					if (i != totalRecord) {
						out.println("{\"0\" : \"" + KCH + "\" , \"1\" : \""
								+ KCM + "\",\"2\" : \"" + KS + "\",\"3\" : \""
								+ KCDM + "\"},");
					} else {
						out.println("{\"0\" : \"" + KCH + "\" , \"1\" : \""
								+ KCM + "\",\"2\" : \"" + KS + "\",\"3\" : \""
								+ KCDM + "\"}");
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
