<template>
  <div class="admin-dashboard p-4">
    <h1 class="text-danger">Admin Dashboard</h1>
    <p>Chào mừng Quản trị viên!</p>
    <div class="row mt-4">
      <div class="col-md-4">
        <div class="card bg-primary text-white p-3 shadow">
          <h3>1,200</h3>
          <p>Sản phẩm</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-success text-white p-3 shadow">
          <h3>450</h3>
          <p>Đơn hàng</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-warning text-dark p-3 shadow">
          <h3>89</h3>
          <p>Người dùng</p>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <router-link to="/" class="btn btn-outline-secondary">Quay về Trang chủ</router-link>
    </div>
  </div>
</template>
