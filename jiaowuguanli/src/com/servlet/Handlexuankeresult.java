package com.servlet;

import java.io.*;
import java.sql.*;

import com.sun.rowset.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.bean.DataByPage;
import com.bean.Login;

public class Handlexuankeresult implements ServletRequestAware,
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
			System.out.println("û�м���������");
		}
	}

	public String Handlexuankeresult() throws IOException {
		// TODO Auto-generated method stub
		init();
		req.setCharacterEncoding("gb2312");
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/html;charset=utf-8");
		HttpSession session = req.getSession(true);
		Connection con = null;
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

		Login loginBean = null;
		try {
			loginBean = (Login) session.getAttribute("loginBean");
			if (loginBean == null) {
				loginBean = new Login();// ��������
				session.setAttribute("loginBean", loginBean);
			}
		} catch (Exception exp) {
			loginBean = new Login();// ��������
			session.setAttribute("loginBean", loginBean);
		}
		try {
			con = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");
			Statement sql = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);
			String logname = loginBean.getLogname();
			String condition = "SELECT  Idnumber FROM users where logname='"
					+ logname + "'";
			ResultSet rs2 = sql.executeQuery(condition);
			rs2.next();
			String Idnumber = rs2.getString("Idnumber");

			String cdn = "SELECT * FROM sc WHERE Idnumber='" + Idnumber + "'";
			ResultSet rs = sql.executeQuery(cdn);
			rowSet = new CachedRowSetImpl();// �����м�����
			rowSet.populate(rs);
			dataBean.setRowSet(rowSet);
			PrintWriter out = resp.getWriter();
			CachedRowSetImpl rowSet = dataBean.getRowSet();
			if (rowSet == null) {
				out.print("û���κβ�ѯ��Ϣ,�޷����");
				return null;
			}
			rowSet.last();// ����ƶ������һ����¼
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
				rowSet.absolute(index);// ��ѯλ���ƶ���currentPageҳ��ʼλ��
				out.print("[{\"biaoti\":[");
				out.print("{\"totalRecord\" : \"" + totalRecord
						+ "\",\"index\" : \"" + index
						+ "\", \"totalPages\" : \"" + totalPages
						+ "\", \"pageSize\" : \"" + pageSize + "\"}");
				out.print("],");
				out.print("\"neirong\":[");
				Boolean boo=true;
				for (int i = 1; i <= totalRecord&&boo; i++) {
					int kch = rowSet.getInt(2);
					String kcm = rowSet.getString(3);
					Float ks = rowSet.getFloat(4);
					String kcdm = rowSet.getString(5);
					String Id = rowSet.getString(7);
					if (i != totalRecord) {
						out.println("{\"KCH\" : \"" + kch + "\" , \"KCM\" : \""
								+ kcm + "\",\"KS\" : \"" + ks
								+ "\" , \"KCDM\" : \"" + kcdm
								+ "\", \"Idnumber\" : \"" + Idnumber + "\"},");
					} else {
						out.println("{\"KCH\" : \"" + kch + "\" , \"KCM\" : \""
								+ kcm + "\",\"KS\" : \"" + ks
								+ "\" , \"KCDM\" : \"" + kcdm
								+ "\", \"Idnumber\" : \"" + Idnumber + "\"}");
					}
					// ���������С���⣬i�����һ���ж�֮ǰû����
					boo=rowSet.next();
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
