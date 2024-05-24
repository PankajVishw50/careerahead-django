
from django.core.validators import BaseValidator
from django.core.exceptions import ValidationError


class IntegerRangeValidator(BaseValidator):

    def __init__(self, min=1, max=10, exclude=[]):
        self.min = min
        self.max = max
        self.exclude = exclude

    def __call__(self, value, instances=None):

        if self.min > value or self.max < value:
            raise ValidationError(f"Value should be in this range. ({self.min} <= value <= {self.max})")

        elif value in self.exclude:
            raise ValidationError(f"Invalid value: You can not choose from these values - ({', '.join(str(_i) for _i in self.exclude)})")

    
    def deconstruct(self) -> tuple:
        return (
            'utils.validators.IntegerRangeValidator',
            [],
            {
                'min': 1,
                'max': 10,
                'exclude': []
            },
        )

    def __eq__(self, instances: object) -> bool:
        return self.min == instances.min and self.max == instances.max and self.exclude == instances.exclude