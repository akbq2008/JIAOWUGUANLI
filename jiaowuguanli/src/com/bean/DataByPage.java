package com.bean;

import com.sun.rowset.*;

public class DataByPage {
	CachedRowSetImpl rowSet = null;// 存储表中全部记录的行集对象
	int pageSize; // 每页显示的记录数
	int totalPages;// 分页后的总页数
	int currentPage;// 当前显示页

	public DataByPage() {

	}

	public CachedRowSetImpl getRowSet() {
		return rowSet;
	}

	public void setRowSet(CachedRowSetImpl rowSet) {
		this.rowSet = rowSet;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

}
