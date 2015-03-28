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
                    evt.dataTransfer.setData(type, $scope.$eval($a.draggableDrag))
                })

                $e.on('dragover', function (evt) {
                    evt.preventDefault()
                })

                $e.on('drop', function (evt) {
                    if (contains(evt.dataTransfer.types, type)) {
                        $scope.$apply(function () {
                            $scope.$eval($a.draggableDrop, {
                                $data: evt.dataTransfer.getData(type)
                            })
                        })
                    }
                })

            }

        }
    }



    function contains(list, value) {
        for (var i= 0; i < list.length; ++i) {
            if (list[i] === value) return true
        }
        return false
    }



})(angular)
