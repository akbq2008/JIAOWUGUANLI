package com.admin;

import java.io.*;

import com.bean.DataByPage;
import com.sun.rowset.*;

import javax.servlet.http.*;
import javax.servlet.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import java.sql.*;

public class Delplan implements ServletRequestAware, ServletResponseAware {

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
			System.out.println("û�м��ص�����");
		}
	}

	public String Delplan() throws IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("utf-8");
		resp.setCharacterEncoding("utf-8");
		String back_JSH = req.getParameter("JSH");
		String back_KCH = req.getParameter("KCH");
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);
		PrintWriter out = resp.getWriter();
		Connection con = null;
		String cdn = "";
		String cdn2 = "";
		int kch = 0;
		int jsh = 0;
		DataByPage dataBean = null;
		try {
			dataBean = (DataByPage) session.getAttribute("dataBean");
			if (dataBean == null) {
				dataBean = new DataByPage();// ��������
				session.setAttribute("dataBean", dataBean);
			}
		} catch (Exception exp) {
			dataBean = new DataByPage();// ��������
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
			cdn = "SELECT * FROM tc";
			ResultSet rs = sql.executeQuery(cdn);
			if (back_JSH != null && back_JSH != null) {
				kch = Integer.parseInt(back_KCH);
				jsh = Integer.parseInt(back_JSH);
				cdn2 = "delete from tc where JSH='" + jsh + "'" + "and KCH='"
						+ kch + "'";
				int rs2 = sql2.executeUpdate(cdn2);
				if (rs2 > 0) {
					out.print(true);
				}
			}
			rowSet = new CachedRowSetImpl();
			rowSet.populate(rs);// ��rs��¼ת�ص�CachedRowSetImpl�����У�Ȼ��ر����ݿ����ӣ��ͷ���Դ
			dataBean.setRowSet(rowSet);

			CachedRowSetImpl rowSet = dataBean.getRowSet();
			if (rowSet == null) {
				out.print("û���κβ�ѯ��Ϣ,�޷����");
				return null;
			}
			rowSet.last();// ����ƶ������һ����¼
			int totalRecord = rowSet.getRow();
			int pageSize = 5;// ÿҳ��ʾ�ļ�¼��
			int lineRecord = 7;
			int totalPages = dataBean.getTotalPages();//
			if (totalRecord % pageSize == 0)
				totalPages = totalRecord / pageSize;// ��ҳ��
			else
				totalPages = totalRecord / pageSize + 1;
			dataBean.setPageSize(pageSize);
			dataBean.setTotalPages(totalPages);
			if (totalPages >= 1) {
				int index = 1;
				rowSet.absolute(index);// ��ѯλ���ƶ���currentPageҳ��ʼλ��
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
					int JSH = rowSet.getInt(3);
					String XM = rowSet.getString(4);
					String SKDD = rowSet.getString(5);
					String SKSJ = rowSet.getString(6);
					String SKBJ = rowSet.getString(7);

					if (i != totalRecord) {
						out.println("{\"0\" : \"" + KCH + "\" , \"1\" : \""
								+ KCM + "\",\"2\" : \"" + JSH + "\",\"3\" : \""
								+ XM + "\",\"4\" : \"" + SKDD + "\",\"5\" : \""
								+ SKSJ + "\" ,\"6\" : \"" + SKBJ + "\"},");
					} else {
						out.println("{\"0\" : \"" + KCH + "\" , \"1\" : \""
								+ KCM + "\",\"2\" : \"" + JSH + "\",\"3\" : \""
								+ XM + "\",\"4\" : \"" + SKDD + "\",\"5\" : \""
								+ SKSJ + "\" ,\"6\" : \"" + SKBJ + "\"}");
					}
					// ���������С���⣬i�����һ���ж�֮ǰû����
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
