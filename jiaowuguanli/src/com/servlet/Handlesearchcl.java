package com.servlet;

import java.io.*;
import java.sql.*;

import com.sun.rowset.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.bean.DataByPage;

public class Handlesearchcl implements ServletRequestAware,
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
			System.out.println("û�м�������");
		}
	}

	public String searchclasses() throws IOException {
		// TODO Auto-generated method stub

		req.setCharacterEncoding("gb2312");//请求时的编码
		resp.setCharacterEncoding("utf-8");//响应时的编码
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);
		Connection con = null;
		DataByPage dataBean = null;
		try {
			dataBean = (DataByPage) session.getAttribute("dataBean");

			if (dataBean == null) {
				dataBean = new DataByPage();
				session.setAttribute("dataBean", dataBean);
			}
		} catch (Exception exp) {
			dataBean = new DataByPage();
			session.setAttribute("dataBean", dataBean);
		}

		try {
			con = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");
			Statement sql = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = sql.executeQuery("SELECT * FROM course");
			rowSet = new CachedRowSetImpl();// �����м�����
			rowSet.populate(rs);
			dataBean.setRowSet(rowSet);//在bean对象里设置结果集
			PrintWriter out = resp.getWriter();
			CachedRowSetImpl rowSet = dataBean.getRowSet();//获取离线结果集
			if (rowSet == null) {
				out.print("û���κβ�ѯ��Ϣ,�޷����");
				return null;
			}
			rowSet.last();//把离线结果集的游标返回给最后一行
			int totalRecord = rowSet.getRow();
			int pageSize = 5;// ÿҳ��ʾ�ļ�¼��
			int totalPages = dataBean.getTotalPages();//
			if (totalRecord % pageSize == 0)
				totalPages = totalRecord / pageSize;// ��ҳ��
			else
				totalPages = totalRecord / pageSize + 1;
			dataBean.setPageSize(pageSize);
			dataBean.setTotalPages(totalPages);
			if (totalPages >= 1) {
				int index = 1;
				rowSet.absolute(index);// 离线结果集游标移动到第一行
				out.print("[{\"biaoti\":[");
				out.print("{\"totalRecord\" : \"" + totalRecord
						+ "\",\"index\" : \"" + index
						+ "\", \"totalPages\" : \"" + totalPages
						+ "\", \"pageSize\" : \"" + pageSize + "\"}");
				out.print("],");
				out.print("\"neirong\":[");
				for (int i = 1; i <= totalRecord; i++) {
					int kch = rowSet.getInt(1);
					String kcm = rowSet.getString(2);
					Float ks = rowSet.getFloat(3);
					String kcdm = rowSet.getString(4);
					if (i != totalRecord) {
						out.println("{\"KCH\" : \"" + kch + "\" , \"KCM\" : \""
								+ kcm + "\",\"KS\" : \"" + ks
								+ "\" , \"KCDM\" : \"" + kcdm + "\"},");
					} else {
						out.println("{\"KCH\" : \"" + kch + "\" , \"KCM\" : \""
								+ kcm + "\",\"KS\" : \"" + ks
								+ "\" , \"KCDM\" : \"" + kcdm + "\"}");
					}
					// ���������С���⣬i�����һ���ж�֮ǰû����
					rowSet.next();
				}
				out.print("]}]");
			}
			con.close();
		} catch (SQLException exp) {
			System.out.println(exp);
		}
		return null;
	}

	private HttpServletResponse resp;

	@Override
	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		resp = arg0;
	}

	private HttpServletRequest req;

	@Override
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		req = arg0;
	}

}
