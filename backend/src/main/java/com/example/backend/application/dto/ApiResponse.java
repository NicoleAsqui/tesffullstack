package com.example.backend.application.dto;

import java.util.Collections;
import java.util.List;

public class ApiResponse<T> {

	private boolean status;
	private String msg;
	private List<T> data;

	public ApiResponse() {
	}

	public ApiResponse(boolean status, String msg, List<T> data) {
		this.status = status;
		this.msg = msg;
		this.data = data;
	}

	public static <T> ApiResponse<T> ok(String msg, List<T> data) {
		return new ApiResponse<>(true, msg, data);
	}

	public static <T> ApiResponse<T> error(String msg) {
		return new ApiResponse<>(false, msg, Collections.emptyList());
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}
}
