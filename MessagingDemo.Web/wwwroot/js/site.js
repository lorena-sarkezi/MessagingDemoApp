var MessagingDemo;
(function (MessagingDemo) {
    var $formCustomer;
    var $formMessage;
    //const $maxMsgchars: number = 160;
    function initialize() {
        $.extend($.validator.messages, {
            required: "Obavezno polje",
            maxlength: jQuery.validator.format("Message has more than {0} characters")
        });
        $("#msg-text").trigger("keyup");
        $formCustomer = $("#form-customer");
        $formMessage = $("#form-message");
        $formCustomer.validate();
        $formMessage.validate();
        $formCustomer.on("submit", formCustomerSubmitCallback);
        $formMessage.on("submit", formMessageSubmitCallback);
        initData();
    }
    MessagingDemo.initialize = initialize;
    function initData() {
        loader(true);
        $.ajax({
            url: "/api/demo/customers",
            contentType: "appliction/json",
            method: "get",
            success: function (res) {
                loader(false);
                res.forEach(function (item, index) {
                    loader(false);
                    insertCustomerIntoTable(item);
                });
            },
            error: handleAjaxError
        });
    }
    MessagingDemo.initData = initData;
    function checkChars(element) {
        // https://stackoverflow.com/questions/9767521/count-and-display-number-of-characters-in-a-textbox-using-javascript/9767636
        var msgMaxChars = 160;
        var charsLeft = 0;
        var charCnt = element.value.length;
        if (charCnt > msgMaxChars) {
            charsLeft = msgMaxChars - charCnt + 1; // Osvjezavanje broja znakova, ako se premasi broj znakova u polju
        }
        else {
            charsLeft = msgMaxChars - charCnt;
        }
        if (charsLeft < 0)
            charsLeft = 0;
        document.getElementById("span-char-cnt").innerText = charsLeft.toString();
    }
    MessagingDemo.checkChars = checkChars;
    function loader(value) {
        var element = document.getElementById("loading");
        if (value === true)
            element.style.display = "block";
        else
            element.style.display = "none";
    }
    MessagingDemo.loader = loader;
    function formCustomerSubmitCallback(event) {
        event.preventDefault();
        if ($formCustomer.valid()) {
            loader(true);
            var name_1 = document.getElementById("cust-name");
            var phone_1 = document.getElementById("cust-phone");
            var data = {
                id: 0,
                fullName: name_1.value,
                phoneNumber: phone_1.value.toString()
            };
            $.ajax({
                url: "/api/demo/customer",
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (res) {
                    //console.log(res);
                    loader(false);
                    insertCustomerIntoTable(res);
                    name_1.value = "";
                    phone_1.value = "";
                },
                error: handleAjaxError
            });
        }
    }
    function formMessageSubmitCallback(event) {
        event.preventDefault();
        if ($formMessage.valid()) {
            var checkboxes_1 = document.querySelectorAll('input[name=customer-checkbox]:checked');
            if (checkboxes_1.length > 0) {
                var customersArr_1 = [];
                checkboxes_1.forEach(function (item) {
                    customersArr_1.push(parseInt(item.getAttribute("data-customer-id")));
                });
                var msg = $("#msg-text").val().toString();
                var data = {
                    customers: customersArr_1,
                    message: msg
                };
                loader(true);
                $.ajax({
                    url: "/api/demo/message",
                    method: "post",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: function () {
                        loader(false);
                        checkboxes_1.forEach(function (item) {
                            item.checked = false;
                            $("#msg-text").val("");
                            $("#msg-text").trigger("keyup");
                            $formMessage.validate().resetForm();
                        });
                    },
                    error: handleAjaxError
                });
            }
        }
    }
    function insertCustomerIntoTable(customer) {
        var table = document.getElementById("table");
        var row = document.createElement("tr");
        var chkCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var phoneCell = document.createElement("td");
        chkCell.innerHTML = "<input type=\"checkbox\" name=\"customer-checkbox\" data-customer-id=" + customer.id + " />";
        nameCell.innerText = customer.fullName;
        phoneCell.innerText = customer.phoneNumber;
        row.append(chkCell);
        row.append(nameCell);
        row.append(phoneCell);
        table.getElementsByTagName("tbody")[0].append(row);
    }
    function handleAjaxError(jxHR, textStatus, error) {
        loader(false);
        console.error(error);
        console.log(jxHR);
        $("#error-modal").modal("show"); // Modal je u _Layout.cshtml
    }
})(MessagingDemo || (MessagingDemo = {}));
//# sourceMappingURL=site.js.map