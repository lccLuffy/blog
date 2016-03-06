<?php
/**
 * Created by PhpStorm.
 * User: lcc_luffy
 * Date: 2016/3/6
 * Time: 15:32
 */

namespace App\Http\Controllers\API\Format;
use Dingo\Api\Http\Response\Format\Format;
use Illuminate\Support\Str;
use Illuminate\Contracts\Support\Arrayable;

class APIFormat extends Format
{
    protected $resultKey = 'results';

    protected function wrapResult(array $result)
    {
        return ['error'=>false,'message'=>'',$this->resultKey => $result];
    }
    /**
     * Format an Eloquent model.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     *
     * @return string
     */
    public function formatEloquentModel($model)
    {
        return $this->encode($this->wrapResult($model->toArray()));
    }

    /**
     * Format an Eloquent collection.
     *
     * @param \Illuminate\Database\Eloquent\Collection $collection
     *
     * @return string
     */
    public function formatEloquentCollection($collection)
    {
        if ($collection->isEmpty()) {
            return $this->encode($this->wrapResult([]));
        }

        return $this->encode($this->wrapResult($collection->toArray()));
    }

    /**
     * Format an array or instance implementing Arrayable.
     *
     * @param array|\Illuminate\Contracts\Support\Arrayable $content
     *
     * @return string
     */
    public function formatArray($content)
    {
        $content = $this->morphToArray($content);

        array_walk_recursive($content, function (&$value) {
            $value = $this->morphToArray($value);
        });

        return $this->encode($this->wrapResult($content));
    }

    /**
     * Get the response content type.
     *
     * @return string
     */
    public function getContentType()
    {
        return 'application/json';
    }

    /**
     * Morph a value to an array.
     *
     * @param array|\Illuminate\Contracts\Support\Arrayable $value
     *
     * @return array
     */
    protected function morphToArray($value)
    {
        return $value instanceof Arrayable ? $value->toArray() : $value;
    }

    /**
     * Encode the content to its JSON representation.
     *
     * @param string $content
     *
     * @return string
     */
    protected function encode($content)
    {
        return json_encode($content);
    }
}