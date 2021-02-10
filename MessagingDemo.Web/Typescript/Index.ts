module MessagingDemo {

    let $formCustomer: JQuery;
    let $formMessage: JQuery;

    //const $maxMsgchars: number = 160;

    export function initialize() {

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

    export function initData() {
        loader(true);
        $.ajax({
            url: "/api/demo/customers",
            contentType: "appliction/json",
            method: "get",
            success: (res: Models.CustomerModel[]) => {
                loader(false);
                res.forEach((item, index) => {
                    loader(false);
                    insertCustomerIntoTable(item);
                });
            },
            error: handleAjaxError
        })
    }

    export function checkChars(element: HTMLInputElement) {
        // https://stackoverflow.com/questions/9767521/count-and-display-number-of-characters-in-a-textbox-using-javascript/9767636
        const msgMaxChars = 160;

        let charsLeft = 0;
        let charCnt = element.value.length;
        if (charCnt > msgMaxChars) {
            charsLeft = msgMaxChars - charCnt + 1;             // Osvjezavanje broja znakova, ako se premasi broj znakova u polju
        }
        else {
            charsLeft = msgMaxChars - charCnt;
        }

        if (charsLeft < 0) charsLeft = 0;

        document.getElementById("span-char-cnt").innerText = charsLeft.toString();
    }

    export function loader(value: boolean) {
        let element: HTMLElement = document.getElementById("loading");

        if (value === true) element.style.display = "block";
        else element.style.display = "none";
    }

    function formCustomerSubmitCallback(event: Event) {
        event.preventDefault();

        if ($formCustomer.valid()) {
            loader(true);

            let name = <HTMLInputElement>document.getElementById("cust-name");
            let phone = <HTMLInputElement>document.getElementById("cust-phone")

            let data: Models.CustomerModel = {
                id: 0,
                fullName: name.value,
                phoneNumber: phone.value.toString()
            }

            $.ajax({
                url: "/api/demo/customer",
                method: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: (res: Models.CustomerModel) => {
                    //console.log(res);
                    loader(false);
                    insertCustomerIntoTable(res);

                    name.value = "";
                    phone.value = "";
                },
                error: handleAjaxError
            })
        }
    }

    function formMessageSubmitCallback(event: Event) {
        event.preventDefault();

        if ($formMessage.valid()) {
            

            let checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name=customer-checkbox]:checked');

            if (checkboxes.length > 0) {
                let customersArr: number[] = [];

                checkboxes.forEach((item) => {
                    customersArr.push(parseInt(item.getAttribute("data-customer-id")));
                });

                let msg: string = $("#msg-text").val().toString();

                let data: Models.MessageModel = {
                    customers: customersArr,
                    message: msg
                };
                loader(true);

                $.ajax({
                    url: "/api/demo/message",
                    method: "post",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: () => {
                        loader(false);
                        checkboxes.forEach((item) => {
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

    function insertCustomerIntoTable(customer: Models.CustomerModel) {

        let table = <HTMLTableElement>document.getElementById("table");

        let row = document.createElement("tr");

        let chkCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let phoneCell = document.createElement("td")

        chkCell.innerHTML = `<input type="checkbox" name="customer-checkbox" data-customer-id=${customer.id} />`;
        nameCell.innerText = customer.fullName;
        phoneCell.innerText = customer.phoneNumber;

        row.append(chkCell);
        row.append(nameCell);
        row.append(phoneCell);

        

        table.getElementsByTagName("tbody")[0].append(row);
    }

    function handleAjaxError(jxHR: JQueryXHR, textStatus: string, error: string) {
        loader(false);
        console.error(error);
        console.log(jxHR);
        $("#error-modal").modal("show"); // Modal je u _Layout.cshtml
    }
}