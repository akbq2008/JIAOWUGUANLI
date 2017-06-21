package com.teacher;

import java.io.*;
import java.sql.*;
import javax.servlet.http.*;
import javax.servlet.*;
import javax.swing.JOptionPane;
import com.bean.DataByPage;
import com.sun.rowset.CachedRowSetImpl;

public class gerenchaxun extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("restriction")
	CachedRowSetImpl rowSet = null;

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);

		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

		} catch (Exception e) {
			System.out.println("û�м��ص�����");
		}
	}

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub

		req.setCharacterEncoding("gb2312");
		HttpSession session = req.getSession(true);
		/*
		 * true: ���session���ڣ��򷵻ظ�session�����򴴽�һ���µ�session�� false:
		 * ���session���ڣ��򷵻ظ�session�����򷵻�null.
		 */
		String Id = req.getParameter("identity");
		String password = req.getParameter("password").trim();
		String again_password = req.getParameter("again_password").trim();
		// boolean b = password.length() > 0 && again_password.length() > 0;
		Connection con = null;
		String cdn = "";
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
		if (password == null)
			password = "";
		if (Id.length() == 0 || password.length() == 0) {
			JOptionPane.showMessageDialog(null, "�㻹û��������Ϣ,������", "error",
					JOptionPane.ERROR_MESSAGE);
			resp.sendRedirect("/demo9/teacher/modify.jsp");
			return;
		}
		if (!password.equals(again_password)) {
			// userBean.setBackNews("�������벻ͬ,ע��ʧ��");
			JOptionPane.showMessageDialog(null, "����������벻ͬ,����������", "error",
					JOptionPane.ERROR_MESSAGE);
			resp.sendRedirect("/demo9/teacher/modify.jsp");
			return;
		}

		try {
			con = DriverManager.getConnection(
					"jdbc:sqlserver://127.0.0.1:1433;DatabaseName=manage",
					"wyc", "123456");
			Statement sql = con
					.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_READ_ONLY);
			cdn = "update users set password='" + password + "'"
					+ "where Idnumber='" + Id + "'";
			ResultSet rs = sql.executeQuery(cdn);
			rowSet = new CachedRowSetImpl();
			rowSet.populate(rs);// ��rs��¼ת�ص�CachedRowSetImpl�����У�Ȼ��ر����ݿ����ӣ��ͷ���Դ
			dataBean.setRowSet(rowSet);
			con.close();

		} catch (SQLException ex) {
			System.out.println(ex);
		}
		resp.sendRedirect("/demo9/tiaozhuan.jsp");
	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
}
