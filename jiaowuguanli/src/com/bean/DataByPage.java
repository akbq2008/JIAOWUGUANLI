package com.bean;

import com.sun.rowset.*;

public class DataByPage {
	CachedRowSetImpl rowSet = null;// �洢����ȫ����¼���м�����
	int pageSize; // ÿҳ��ʾ�ļ�¼��
	int totalPages;// ��ҳ�����ҳ��
	int currentPage;// ��ǰ��ʾҳ

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
