// 1. HTML 요소 선택
var todoInput = document.getElementById("todo-input");
var todoForm = document.getElementById("todo-form");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
var todos = [];
var doneTasks = [];
// 3. 렌더링
var renderTasks = function () {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    // 해야 할 일 → todoList
    todos.forEach(function (todo) {
        var li = createTodoElement(todo, false); // ✅ 반환 타입 맞추기
        todoList.appendChild(li); // ✅ 올바른 리스트에 붙이기
    });
    // 완료된 일 → doneList
    doneTasks.forEach(function (todo) {
        var li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
// 4. 입력값
var getTodoText = function () { return todoInput.value.trim(); };
// 5. 추가
var addTodo = function (text) {
    todos.push({ id: Date.now(), text: text });
    todoInput.value = "";
    renderTasks();
};
// 6. 완료 이동
var completeTask = function (todo) {
    todos = todos.filter(function (t) { return t.id !== todo.id; });
    doneTasks.push(todo);
    renderTasks();
};
// 7. 완료 목록 삭제 (이전 deleteTodo 대체)
var deleteDone = function (todo) {
    doneTasks = doneTasks.filter(function (t) { return t.id !== todo.id; }); // ✅ 완료목록에서 삭제
    renderTasks();
};
// 8. 아이템 생성
var createTodoElement = function (todo, isDone) {
    var li = document.createElement("li");
    li.classList.add("render-container__item");
    var span = document.createElement("span");
    span.textContent = todo.text;
    var button = document.createElement("button");
    button.classList.add("render-container__item-button");
    if (isDone) {
        button.textContent = "삭제";
        button.style.background = "#dc3545";
        button.addEventListener("click", function () { return deleteDone(todo); }); // ✅ 완료목록에서 삭제
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
        button.addEventListener("click", function () { return completeTask(todo); }); // ✅ 이름/동작 일치
    }
    li.append(span, button);
    return li;
};
// 9. 폼 이벤트
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = getTodoText();
    if (text)
        addTodo(text);
});
renderTasks();
