exports.getAnnouncement = (req, res) => {
  res.json({ message: "Exam Fee Extended Until 12 Midnight Today!" });
};

exports.healthCheck = (req, res) => {
  res.json({ status: "OK" });
};

exports.getConfig = (req, res) => {
  res.json({ maintenanceMode: false });
};

exports.getMaintenanceStatus = (req, res) => {
  res.json({
    active: false,
    message: "No scheduled maintenance"
  });
};

exports.getLiveNotification = (req, res) => {
  res.json({ message: null }); // Provide dynamic notification here
};

exports.fullHealthStatus = (req, res) => {
  res.json({
    nginx: "OK",
    backend: "OK",
    mysql: "OK",
    payments: "OK"
  });
};
