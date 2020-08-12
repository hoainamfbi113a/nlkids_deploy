var express = require('express');
var cors = require('cors')
var body_parser = require('body-parser');
const path = require('path');
require('./dbConection/db');

var employeeController = require('./controller/controllerEmployee');
var memberController = require('./controller/controllerMember');
var questionController = require('./controller/controllerQuestion');
var examController = require('./controller/controllerExam');
var userController = require('./controller/client/controllerUser');
var dethiContoller = require('./controller/controllerthi');
var resultController = require('./controller/controllerresult');
var lessionContentController = require('./controller/controllerLessonContent');
var newController = require('./controller/controllerNews');
var goodStudentController = require('./controller/controllerGoodStudent');
var videoLearningController = require('./controller/controllerVideoLearning');
var classSubjectController = require('./controller/controllerClass');
var gameController = require('./controller/controllerGame');

var newControllerClient = require("./controller/client/controllerNews");
var lessonControllerClient = require("./controller/client/controllerLesson")
var forumQuestionControllerClient = require("./controller/client/contronllerForumQuestion")

var app = express();
var port = process.env.PORT || 5000
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views/'));
app.use(express.static(__dirname + '/public'));
app.use(body_parser.urlencoded({
  extended:false
}));
app.use(body_parser.json());

app.use('/employee',employeeController);
app.use('/admin/member',memberController);
app.use('/admin/question',questionController);
app.use('/admin/exam',examController);
app.use('/admin/result',resultController);
app.use('/admin/lession', lessionContentController);
app.use('/admin/news', newController);
app.use('/admin/goodstudent', goodStudentController);
app.use('/admin/videolearning', videoLearningController);
app.use('/admin/classsubject', classSubjectController);
app.use('/admin/game', gameController);

app.use('/users', userController)
app.use('/client/dethi', dethiContoller);
app.use('/client/news', newControllerClient);
app.use('/client/lesson', lessonControllerClient);
app.use('/client/forumquestion', forumQuestionControllerClient);


