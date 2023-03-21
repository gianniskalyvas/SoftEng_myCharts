const data = {
    //load from database
    charts: require(),
    setCharts: function (data) { this.employees = data }
}

const getAllCharts = (req, res) => {
    res.json(data.chart_names);
}

const createNewChart = (req, res) => {
    const newChart = {
        name: req.body.name
    }

    if (!newChart.name) {
        return res.status(400).json({ 'message': 'Name is required.' });
    }

    data.setCharts([...data.charts, newChart]);
    res.status(201).json(data.charts);
}

const deleteChart = (req, res) => {

    const chart = data.charts.find(ch => ch.name === req.body.name);

    if (!chart) {
        return res.status(400).json({ "message": `Chart ${req.body.name} not found` });
    }

    const filteredArray = data.charts.filter(ch => ch.name !== req.body.name);

    data.setCharts([...filteredArray]);
    res.json(data.charts);
}

const getChart = (req, res) => {
    const chart = data.charts.find(ch => ch.name === req.params.name);
    if (!chart) {
        return res.status(400).json({ "message": `Chart ${req.body.name} not found` });
    }
    res.json(chart);
}

module.exports = {
    getAllCharts,
    createNewChart,
    deleteChart,
    getChart
}