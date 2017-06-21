package com.servlet;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

public class Handleexit implements ServletRequestAware, ServletResponseAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public String exit() throws IOException {

		HttpSession session = req.getSession(true);
		session.invalidate();// 销毁用户的session对象
		return "Handleexit";
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
