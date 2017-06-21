package com.bean;

import java.util.LinkedList;

public class Login {
	String backNews = "", backNews2 = "", logname = "",Idnumber="";

	public String getIdnumber() {
		return Idnumber;
	}

	public void setIdnumber(String idnumber) {
		this.Idnumber = idnumber;
	}
	public String getLogname() {
		return logname;
	}

	public void setLogname(String logname) {
		this.logname = logname;
	}
	
	
	public String getBackNews2() {
		return backNews2;
	}

	public void setBackNews2(String backNews2) {
		this.backNews2 = backNews2;
	}

	LinkedList<String> xuanke;

	public LinkedList<String> getXuanke() {
		return xuanke;
	}

	public void setXuanke(LinkedList<String> xuanke) {
		this.xuanke = xuanke;
	}

	public String getBackNews() {
		return backNews;
	}

	public void setBackNews(String backNews) {
		this.backNews = backNews;
	}



}
