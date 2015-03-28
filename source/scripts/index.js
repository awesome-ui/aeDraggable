(function (angular) {



    angular.module('bDraggable', [])

        .directive('bDraggable', bDraggableDirective)

    ;



    function bDraggableDirective() {
        return {
            restrict: 'A',

            link: function ($scope, $e, $a) {

                var type= $a.bDraggable

                $a.$set('draggable', true)

                $e.on('dragstart', function (evt) {
                    var data= $scope.$eval($a.draggableDrag)
                    setTransferData(evt.dataTransfer, type, data)
                })

                $e.on('dragenter', function (evt) {
                    evt.stopPropagation()
                    evt.preventDefault()
                })

                $e.on('dragover', function (evt) {
                    evt.stopPropagation()
                    evt.preventDefault()
                })

                $e.on('drop', function (evt) {
                    if (hasTransferData(evt.dataTransfer, type)) {
                        $scope.$apply(function () {
                            $scope.$eval($a.draggableDrop, {
                                $data: getTransferData(evt.dataTransfer, type)
                            })
                        })
                    }
                })

                function setTransferData(transfer, type, data) {
                    if (isIe()) { // bldjad
                        data= JSON.stringify({
                            type: type,
                            data: data,
                        })
                        transfer.setData('text', data)
                    } else {
                        data= '' + data
                        transfer.setData(type, data)
                    }
                }

                function hasTransferData(transfer, type) {
                    if (isIe()) { // bldjad
                        try {
                            var data= JSON.parse(transfer.getData('text'))
                            if (data && data.type == type) {
                                return true
                            }
                        } catch (err) {}
                    } else {
                        for (var i= 0; i < transfer.types.length; ++i) {
                            if (transfer.types[i] === type) return true
                        }
                        return false
                    }
                }

                function getTransferData(transfer, type) {
                    if (isIe()) { // bldjad
                        try {
                            var data= JSON.parse(transfer.getData('text'))
                            if (data && data.type == type) {
                                return data.data
                            }
                        } catch (err) {}
                    } else {
                        return transfer.getData(type)
                    }
                }

            }

        }
    }



    function isIe() {
        if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
            return true
        }
        if (navigator.userAgent.indexOf('Trident') !== -1 && navigator.userAgent.indexOf('rv:11') !== -1) {
            return true
        }
        return false
    }



})(angular)
