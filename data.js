// 模拟数据：商品销量（柱状图）
const products = [
    { name: "手机", sales: 120 },
    { name: "笔记本", sales: 90 },
    { name: "耳机", sales: 150 },
    { name: "平板", sales: 70 },
    { name: "显示器", sales: 110 }
];

const tbody = document.getElementById("product-table-body");

// 渲染表格
products.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-index", index); // 设置数据索引，方便识别

    tr.innerHTML = `
      <td><input type="checkbox" name="product" value="${index}"></td>
      <td>${item.name}</td>
      <td>${item.sales}</td>
    `;

    tr.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() !== "input") {
            const checkbox = tr.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event("change"));
        }
    });

    tbody.appendChild(tr);
});


// 初始化图表
const ctx = document.getElementById("salesChart").getContext("2d");
let salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '商品销量',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// 监听复选框变化
document.querySelectorAll('input[name="product"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedIndexes = Array.from(document.querySelectorAll('input[name="product"]:checked'))
            .map(cb => parseInt(cb.value));

        const selectedProducts = selectedIndexes.map(i => products[i]);

        // 更新图表
        salesChart.data.labels = selectedProducts.map(p => p.name);
        salesChart.data.datasets[0].data = selectedProducts.map(p => p.sales);
        salesChart.update();
    });
});
