tensorflowjs_converter \
    --input_format=tf_frozen_model \
    --output_node_names='final_result' \
    --saved_model_tags=serve \
    static/models/output_graph.pb \
    static/models/