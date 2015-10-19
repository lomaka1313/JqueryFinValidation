(function () {
    $.fn.blockNonNubmer = function (){
        return this.on('keydown', function (e) {
            var code = e.keyCode || e.charCode || e.which;
            if ((code >= 48 && code <= 57) || (code >= 96 && code<=105) || code == 8 || code == 13 || code==8) return true;
            else return false;
        });
    }
    $.fn.numberToken = function (input) {
        this.blockNonNubmer();

        var obj = this;
        hideError();

        function validate(){

            var value = obj.val();
            var num = input.val();

            if(num != undefined && (value.length>0 || $.trim($('#field-mfo').val()).length>0) ) {
                if (value.length < 5) {
                    showError(global.get("Widgets.PaymentTemplatesForm.ValueTooShort"));
                    return false;
                } else if (value.length >= 5) {
                    hideError();
                }
            } else {
                return false;
            }

            var start = value;
            num = num.substring(0,5)
            var v= value.substring(4,5);
            value = value.split("");
            value[4] = 0;
            value = value.join("")
            var summ = num+value;
            summ = summ.split("")
            var str = "1371337137137137137137",
                arr = [];
            str = str.split("");

            for(var i=0; i<summ.length;i++){
                var j = summ[i]*str[i];
                j = new String(j)
                if(j.length == 2){
                    j = new String(j);
                    arr.push(j[1])
                }else{
                    arr.push(j[0])
                }
            }
            var s = 0;
            for(var j=0;j<arr.length;j++){
                s += parseInt(arr[j])
            }
            s = s + start.length;
            s = new String(s);
            s = s[1]*7;
            if(s>9){
                s = new String(s);
                s = s[1]
            }
            if(s!=v){
                return showError(global.get("Widgets.PaymentTemplatesForm.IncorrectCombo"));
            }else{
                hideError();
            }
        }

        function showError(error) {

            // SHOW ERROR IF MFO IS EMPTY
            if( $.trim($('#field-mfo').val().length) == 0) {
                $('#field-mfo').addClass('error');
                $('.mfo-error').html(global.get("Widgets.PaymentTemplatesForm.ValueTooShort")).show();
            }

            $(obj).addClass('error');
            $(obj).parent().find('.error').show().html(error);
        }

        function hideError() {
            $(obj).removeClass('error');
            $(obj).parent().find('.error').hide();

            $('#field-mfo').removeClass('error');
            $('.mfo-error').hide();
        }

        return this
            .on("blur change", function () {
                validate();
            });
    }
    $.fn.egrpou = function () {
        this.blockNonNumbers({allowDecimal:false});

        var obj = this;
        hideError();

        function validate(){

            var value = obj.val();

            if(value.length == 0) {
                return false;
            }else if(value.length < 8 && value.length >0 ){
                showError(global.get("Widgets.PaymentTemplatesForm.ValueTooShort"));
                return false;
            }else if(value.length == 8){
                hideError();
            }

            var last = parseInt(value.substring(7,8)), coef,f= value;
            if(parseInt(value)>30000000 && parseInt(value)<60000000){
                coef = "7123456";
            }else if(parseInt(value)<30000000 || parseInt(value)>60000000){
                coef = "1234567";
            }
            value = value.substring(0,7);
            coef = coef.split("");
            value = value.split("");
            var n = 0,a;
            for(var i=0;i<value.length;i++){
                n += parseInt(value[i]*coef[i])
            }
            a = n/11;
            a = parseInt(a)*11;
            var valid = n-a;
            if(valid>9){
                var coef2;
                value = value.join("");
                if(parseInt(f)>30000000 && parseInt(f)<60000000){
                    coef2 = "9345678";
                }else if(parseInt(f)<30000000 || parseInt(f)>60000000){
                    coef2 = "3456789";
                }
                coef2 = coef2.split("");
                var n2 = 0,a2;
                for(var i=0;i<value.length;i++){
                    n2 += parseInt(value[i]*coef2[i])
                }
                a2 = n2/11;
                a2 = parseInt(a2)*11;
                var valid2 = n2-a2;
                if(valid2 != last) {
                    return showError(global.get("Widgets.PaymentTemplatesForm.IncorrectValue"));
                }else{
                    return hideError();
                }
            }else{
                if(valid!=last) {
                    return showError(global.get("Widgets.PaymentTemplatesForm.IncorrectValue"));
                }else{
                    return hideError();
                }
            }
        }

        function showError(error) {
            $(obj).addClass('error');
            $(obj).parent().find('.error').show().html(error);
        }

        function hideError() {
            $(obj).removeClass('error');
            $(obj).parent().find('.error').hide();
        }

        return this
            .on("blur change", function () {
                validate();
            })
    }
    $.fn.inn = function () {
        this.blockNonNumbers({allowDecimal:false});

        var obj = this;
        hideError();

        function validate(){

            var value = obj.val();

            hideError();

            if(value.length == 0 || value.length > 10 || value == parseInt(0)) {
                return false;
            }else if(value.length > 0 && value.length < 10 ) {
                showError(global.get("Widgets.PaymentTemplatesForm.ValueTooShort"));
                return false;
            }

            var last = value.substring(9,10),
                coef = ["-1", "5", "7", "9", "4", "6", "10", "5", "7"];
            value = value.substring(0,9);
            value = value.split("");
            var n = 0,a;
            for(var i=0;i<value.length;i++){
                n += parseInt(value[i]*coef[i])
            }
            a = n/11;
            a = parseInt(a)*11;
            var valid = n-a;
            if(valid>9){
                valid = new String(valid);
                valid = valid[1]
            }
            if(valid!=parseInt(last)){
                return showError(global.get("Widgets.PaymentTemplatesForm.IncorrectValue"));
            }else{
                hideError();
            }
        }

        function showError(error) {
            $(obj).addClass('error');
            $(obj).parent().find('.error').show().html(error);
        }

        function hideError() {
            $(obj).removeClass('error');
            $(obj).parent().find('.error').hide();
        }

        return this.on('blur change', function() {
            validate();
        })
    }
})()